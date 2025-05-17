import { useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import TrainArrivalItem from "./components/TrainArrivalItem";

interface LineArrivals {
    line_id:number,
    arrivals:{
        direction_stop_name:string,
        arrivals:[{
            time: Date
        }]
    }
}

class StopData {
    stop_id:number;
    stop_name:string;
    correspondences:number[];
    line_arrivals:LineArrivals[];

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
        const name_and_correspondences = db.getAllAsync<BasicDataInfo>(`
            WITH route_station_correspondences AS(
                SELECT DISTINCT r.route_id
                FROM route_stations r
                WHERE r.stop_id = $id
            )
            
            SELECT s.name as stop_name, json_group_array(cte.route_id) AS line_ids
            FROM stops s, route_station_correspondences cte
            WHERE s.stop_id = $id;
        `, {$id: id});
        
        (await name_and_correspondences).forEach(async element => {
            stop_data.stop_id = id
            stop_data.stop_name = element.stop_name
            stop_data.correspondences = JSON.parse(element.line_ids)
        });
        
        
        setData(stop_data)
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

