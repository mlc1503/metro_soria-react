import { useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import TrainArrivalItem from "./components/TrainArrivalItem";
import ItineraryItem from "./components/ItineraryItem";

class LineArrival {
    line_id:number;
    arrivals:{
        direction_stop_name:string;
        arrivals:number[]
    }

    constructor( line_id: number, arrivals: { direction_stop_name: string; arrivals: number[]; }){
        this.line_id = line_id,
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
    route_stop_id_time: string
}
interface timeTable{
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
        
        let stop_data = new StopData();

        //get nombre, compute correspondencias
        const name_and_correspondences = await db.getFirstAsync<BasicDataInfo>(`
            WITH route_station_correspondences AS(
                SELECT DISTINCT r.route_id
                FROM route_stations r
                WHERE r.stop_id = $id
            )
            
            SELECT s.name as stop_name, json_group_array(cte.route_id) AS line_ids
            FROM stops s, route_station_correspondences cte
            WHERE s.stop_id = $id;
        `, {$id: id}).catch((err)=>{throw err;});
        

        if(!name_and_correspondences){
            throw new Error(`No se encontraron datos para estación con ID: ${id}`);
        }

        // let date = new Date()
        // let current_time = date.getHours() * 60 + date.getMinutes()
        let current_time = 600 //debug
        
        let departure_from_origin_time = 0, departure_from_destination_time = 0
        
        //get route_id and route_stations of each line 
        for await (const line of db.getEachAsync<RouteStations>(`
            WITH route_station_correspondences AS(
                SELECT DISTINCT r.route_id
                FROM route_stations r
                WHERE r.stop_id = $id
            )
            SELECT r.route_id,  json_group_array(json_object('stop_id',r.stop_id, 'time_to_next',r.time_to_next)) AS route_stop_id_time
            FROM route_stations r JOIN route_station_correspondences cte ON cte.route_id = r.route_id
            WHERE r.route_id IN route_station_correspondences GROUP BY r.route_id;
        `, {$id: id})){            
            
            let json_parsed:ReadonlyArray<{stop_id: number, time_to_next:number}> = JSON.parse(line.route_stop_id_time);
            
            let total_line_trip_time_from_origin = json_parsed.reduce((acc, obj)=> {return acc + obj.time_to_next}, 0) //computes sum of time_to_next 
            let time_to_selectedStation_from_origin = 0;
            let time_to_selectedStation_from_destination = 0;
            
            for (let index = 0; index < json_parsed.length; index++) {

                const element = json_parsed[index];
                if(element.stop_id == id) break;

                time_to_selectedStation_from_origin += element.time_to_next;
            }

            time_to_selectedStation_from_destination = total_line_trip_time_from_origin - time_to_selectedStation_from_origin;

            departure_from_origin_time = current_time - time_to_selectedStation_from_origin;
            
            departure_from_destination_time = current_time - time_to_selectedStation_from_destination;


            // console.log(current_time);
            // console.log(departure_from_origin_time);
            // console.log(departure_from_destination_time);
            
            const train_timeTable = await db.getAllAsync<timeTable>(`
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
    
            `, {$id: parseInt(line.route_id), $time_ida: departure_from_origin_time, $time_vuelta: departure_from_destination_time}).catch((err)=>{throw err}
            );

            let trains_ida:number[] = [], trains_vuelta:number[] = []
            
            train_timeTable.forEach(element => {
                if(element.direction == 'IDA'){
                    trains_ida.push(element.departure_time)
                }
                else{
                    trains_vuelta.push(element.departure_time)
                }
            });

            stop_data.line_arrivals.push(new LineArrival(parseInt(line.route_id), { direction_stop_name: 'testIDA', arrivals: trains_ida }))
            stop_data.line_arrivals.push(new LineArrival(parseInt(line.route_id), { direction_stop_name: 'testVUELTA', arrivals: trains_vuelta }))

            // console.log(stop_data.line_arrivals);
        }

        stop_data.stop_id = id
        stop_data.stop_name = name_and_correspondences.stop_name
        stop_data.correspondences = JSON.parse(name_and_correspondences.line_ids)
        
        setData(stop_data)
        setIsLoading(false)
    }

    console.log();
    // console.log(data);
    console.log(data.line_arrivals);
    console.log();
    

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
                    <>
                        <TrainArrivalItem/>
                        <TrainArrivalItem/>
                        <TrainArrivalItem/>
                    </>
                }

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
