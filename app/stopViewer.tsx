import { useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import TrainArrivalItem from "./components/TrainArrivalItem";

class LineArrival {
    line_id: number;
    title_line:string
    arrivals:
    {
        direction_stop_name: string;
        time_to_selectedStation:number;
        departure_minutes:number[]
    }[]

    constructor ( line_id: number, title_line:string, arrivals:{ direction_stop_name: string; time_to_selectedStation:number, departure_minutes:number[] }[]){
        this.line_id = line_id;
        this.title_line = title_line;
        this.arrivals = arrivals
    }

}

class StopData {
    stop_id:number;
    stop_name:string;
    correspondences:number[];
    line_arrivals:LineArrival[];

    public constructor(){
        this.stop_id = 0;
        this.stop_name = "hola";
        this.correspondences = [6];
        this.line_arrivals = [];
    }
}

interface BasicDataInfo {
    stop_name:string,
    line_ids:string // SQLITE returns JSON as string
}
interface RouteStations {
    route_id: string,
    route_stop_id_time: string // SQLITE returns JSON as string
}
interface TimeTable{
    id: number,
    direction: string,
    departure_time: number
}


export default function Index(){
    const {stop_id} = useLocalSearchParams();
    const db = useSQLiteContext();
    const [data, setData] = useState<StopData>(new StopData());
    const [isLoading, setIsLoading] = useState(true);
    
    let id:number = typeof stop_id === 'string' ? parseInt(stop_id) : parseInt(stop_id[0])

    useEffect(()=>{
        loadData(id)
    }, [db])

    const loadData = async(id:number) =>{
        
        const current_date = new Date();
        const current_minutes = current_date.getHours() * 60 + current_date.getMinutes();
        let stop_data = new StopData();

        //get nombre, parse correspondences
        const name_and_correspondences = await getName_and_Correspondences();

        stop_data.stop_id = id
        stop_data.stop_name = name_and_correspondences.stop_name
        stop_data.correspondences = JSON.parse(name_and_correspondences.line_ids)
        
        //calculate timetables for each line
        stop_data.line_arrivals = await Promise.all(
            
            stop_data.correspondences.map(async (correspondence) => {
                return await getLineArrivals(correspondence, current_minutes)
    
            })

        );
        setData(stop_data);
        setIsLoading(false);

        async function getName_and_Correspondences() {
            const name_and_correspondences = await db.getFirstAsync<BasicDataInfo>(`
            WITH route_station_correspondences AS(
                SELECT DISTINCT r.route_id
                FROM route_stations r
                WHERE r.stop_id = $id
            )
            
            SELECT s.name as stop_name, json_group_array(cte.route_id) AS line_ids
            FROM stops s, route_station_correspondences cte
            WHERE s.stop_id = $id;
        `, { $id: id }).catch((err) => { throw err; });


            if (!name_and_correspondences) {
                throw new Error(`No se encontraron datos para estación con ID: ${id}`);
            }
            return name_and_correspondences;
        }
    }

    return(
        <ScrollView style={{
            backgroundColor: colorsList.light.FULL_WHITE
        }}>

            <View style={{
				margin: constants.bounds.padding,
				flexDirection: 'column',
				rowGap: constants.bounds.padding,
				alignContent: "center",
				alignItems: "center",
			}}>
                
                <Text style={styles.stopText}>{data.stop_name}</Text>

                <View style={styles.correspondence_icon_array}>
                    {getArrayIconoLineas(data.correspondences)}
                </View>

                <Text style={styles.labelSection}>Salidas</Text>

                {
                    data.line_arrivals.map((item, index) =>{
                        return <TrainArrivalItem key={index} line_id={item.line_id} title_name={item.title_line} arrivals={item.arrivals}/>
                    })
                }
                {/* {
                    <TrainArrivalItem/>
                } */}

                <Text style={styles.labelSection}>Avisos</Text>
                <View style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>No hay avisos</Text>
                </View>
            </View>
        </ScrollView>
    )

    async function getLineHeadersNames(correspondence: number) {
        const get_line_headers_names = await db.getFirstAsync<{ origin_stop_name: string; destination_stop_name: string; }>(`
                    SELECT
                        origin.name AS origin_stop_name,
                        destination.name AS destination_stop_name
                    FROM 
                        lines l
                    JOIN 
                        stops origin ON l.origin_id = origin.stop_id
                    LEFT JOIN 
                        stops destination ON l.destination_id = destination.stop_id
                    WHERE l.id = $id;
                `, { $id: correspondence }).catch((error) => { throw error; });

        if (get_line_headers_names) {

            return[get_line_headers_names.origin_stop_name, get_line_headers_names.destination_stop_name]
        }
    }


    async function getLineArrivals(correspondence:number, current_minutes:number) {

        let line_id = correspondence;
        
        //by default, title_line has Line 1's special header
        let title_line = 'Estación de Soria - (Circular)';
        

        //gets line headers' names and getArrivals
        const names = await getLineHeadersNames(correspondence);
        if(names){
            
            if(correspondence != 1){
                title_line = names[0] + ' - ' + names[1]
                
            }    
            const arr = await getArrivals(correspondence, current_minutes, names);
            
            let lineArrivals = new LineArrival(line_id, title_line, arr)
            return(lineArrivals)
        
        }
        else{
            throw new Error("NO SE HAN PODIDO COGER NOMBRES DE DESTINO Y ORIGEN DE LA LINEA");
        }

    }

    async function getArrivals(correspondence: number, current_minutes:number, names:string[]) {

        let stop_time_to_next:ReadonlyArray<{ stop_id: number; time_to_next: number; }>;
        let total_trip_time = 0
        let time_to_selectedStation_from_origin = 0
        let time_to_selectedStation_from_destination = 0

        const route_line = await db.getFirstAsync<RouteStations>(`
            SELECT r.route_id,  json_group_array(json_object('stop_id',r.stop_id, 'time_to_next',r.time_to_next)) AS route_stop_id_time
            FROM route_stations r JOIN stops s ON s.stop_id = r.stop_id
            WHERE r.route_id = $correspondence;
        `, { $correspondence: correspondence }).catch((error) => { throw error; });

        if(route_line){
            stop_time_to_next = JSON.parse(route_line.route_stop_id_time);
            total_trip_time = stop_time_to_next.reduce((acc, obj) => { return acc + obj.time_to_next; }, 0);
    
            time_to_selectedStation_from_origin = 0;
            time_to_selectedStation_from_destination = 0;


            for (let index = 0; index < stop_time_to_next.length; index++) {
                const element = stop_time_to_next[index];

                if (element.stop_id == id) break;

                time_to_selectedStation_from_origin += element.time_to_next;
            }
            //calculamos tiempo de trayecto desde destino
            time_to_selectedStation_from_destination = total_trip_time - time_to_selectedStation_from_origin;
        }


        const train_timeTable = await getTimetable(correspondence, current_minutes, time_to_selectedStation_from_origin, time_to_selectedStation_from_destination);


        const array_ida = train_timeTable.filter(item => item.direction === 'IDA').map(item => item.departure_time)
        const array_vuelta = train_timeTable.filter(item => item.direction === 'VUELTA').map(item => item.departure_time)

        if(correspondence != 1){
            return [
                {
                    direction_stop_name: names[0],
                    time_to_selectedStation: time_to_selectedStation_from_origin,
                    departure_minutes: array_ida
                },
                {
                    direction_stop_name: names[1],
                    time_to_selectedStation: time_to_selectedStation_from_destination,
                    departure_minutes: array_vuelta
                },
            ]
        }
        else{
            return [
                {
                    direction_stop_name: names[0] +" - " + "Vía 1",
                    time_to_selectedStation: time_to_selectedStation_from_origin,
                    departure_minutes: array_ida
                },
                {
                    direction_stop_name: names[0] +" - " + "Vía 2",
                    time_to_selectedStation: time_to_selectedStation_from_destination,
                    departure_minutes: array_vuelta
                },
            ]
        }

    }

    async function getTimetable(correspondence:number,current_minutes:number,time_to_selectedStation_from_origin: number, time_to_selectedStation_from_destination: number) {

        const timetable = await db.getAllAsync<TimeTable>(`
            WITH train_timetable AS(
                SELECT * FROM(
                    SELECT t.id, t.direction, t.departure_time
                    FROM trains t
                    WHERE t.route_id = $id 
                    AND t.departure_time >= $time_ida
                    AND t.direction = 'IDA'
                    LIMIT 2
                )
                
                UNION
                
                SELECT * FROM (
                    SELECT t.id, t.direction, t.departure_time
                    FROM trains t
                    WHERE t.route_id = $id
                    AND t.departure_time >= $time_vuelta
                    AND t.direction = 'VUELTA'
                    LIMIT 2
                )
            )
            SELECT * FROM train_timetable ORDER BY train_timetable.direction;
        
        `, { $id: correspondence, $time_ida: (current_minutes - time_to_selectedStation_from_origin), $time_vuelta: (current_minutes - time_to_selectedStation_from_destination) }).catch((err) => { throw err; }
        ).catch((error) => { throw error; });
        
        
        return timetable;
    }
}

const styles = StyleSheet.create({
    correspondence_icon_array:{
        flexDirection: "row",
        justifyContent: "center",
        columnGap: constants.bounds.padding,
    },
    stopText: {
        fontSize: constants.text.sectionTitleSize,
        fontWeight: "semibold",
        textAlign: "center"
    },
    labelSection: {
        fontSize: constants.text.mainTitleSize,
        fontWeight: "semibold"
    }
})
