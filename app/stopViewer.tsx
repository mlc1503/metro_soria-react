import { useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import TrainArrivalItem from "./components/TrainArrivalItem";


interface RouteStations{
    stop_id: number,
}

type LineArrivals = {
    line_id:number,
    arrivals:{
        direction_stop_name:string,
        arrivals:[{
            time: Date
        }]
    }
}

interface StopData{
    stop_id:string,
    stop_name:number,
    correspondences:number[],
    line_arrivals:LineArrivals[]
}


export default function Index(){
    const {stop_id} = useLocalSearchParams();
    const db = useSQLiteContext();
    const [data, setData] = useState<StopData>();
    const [isLoading, setIsLoading] = useState(true);
    
    let id:number = typeof stop_id === 'string' ? parseInt(stop_id) : parseInt(stop_id[0])

    useEffect(()=>{
        loadData(id)

    })

    const loadData = async(id:number) =>{

        //get nombre
        //compute correspondencias

        //compute times según tren

        const all_route_stations = db.getAllAsync<RouteStations>(`
            SELECT r.stop_id, l.id as line_id 
            FROM route_stations r 
                JOIN lines l ON l.id = r.route_id
            WHERE l.id NOT LIKE ?;
            `, id)

    
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
                
                {/* <Text style={styles.stopText}>{id}</Text> */}
                <Text style={styles.stopText}>Pontevedra</Text>

                <View style={styles.correspondence_icon_array}>
                    {getArrayIconoLineas([2, 3, 4])}
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
        fontWeight: "semibold"
    },
    labelSection: {
        fontSize: constants.text.mainTitleSize,
        fontWeight: "semibold"
    }
})

