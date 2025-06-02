import { router, useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import TrainArrivalItem from "./components/TrainArrivalItem";
import { useAuth } from "@/app/AuthContext";
import compute_timetables from "./controllers/compute_timetables";

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
    
    const { user } = useAuth();
    const { stop_id } = useLocalSearchParams();
    const db = useSQLiteContext();
    
    const [data, setData] = useState<StopData>(new StopData());
    const [isLoading, setIsLoading] = useState(true);
    const [isStationSaved, setIsStationSaved] = useState(false);
    
    let id:number = typeof stop_id === 'string' ? parseInt(stop_id) : parseInt(stop_id[0])

    useEffect(()=>{
        loadData(id)
    }, [db])

    const loadData = async(id:number) =>{
        
        setData(await compute_timetables(id, db));
        setIsLoading(false);
        getSavedStation()


    }

    const getSavedStation = async()=>{
        if(user){
            await db.getFirstAsync('SELECT stop_id FROM user_saved_stations WHERE user_id = ? AND stop_id = ?', [user.id, id])
            .then((result)=>{
                if(result){ 
                    console.log("RESULT",result);
                    setIsStationSaved(true)
                }
            })
            .catch((error)=> {throw error})
        }
    }

    const saveStation = async()=>{
        if(user){
            db.runAsync('INSERT INTO user_saved_stations (user_id, stop_id) VALUES (?,?)', [user.id, id])
                .then((result)=>{
                    console.log("ESTACION GUARDADA",result);
                    setIsStationSaved(true)
                })
                .catch((error)=> {throw error})
        }
    }
    const removeStation = async()=>{
        if(user){
            db.runAsync('DELETE FROM user_saved_stations WHERE user_id = ? AND stop_id = ?', [user.id, id])
                .then((result)=>{
                    console.log("ESTACION BORRADA",result);
                    setIsStationSaved(false)
                })
                .catch((error)=> {throw error})
        }
    }

    const alert = ()=>{
        Alert.alert(
            "No has iniciado sesión",
            "No puedes guardar la estación sin iniciar sesión.",
            [
                {
                    text: "Inicia sesión",
                    onPress: (()=> router.navigate('/users'))
                },
                {
                    text: "Volver",
                }
            ]
        )
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

                {
                    user && isStationSaved ?
                    <Button title="Eliminar de favoritos" onPress={async()=>{
                        console.log("consulta elimina estacion con ID:", id);
                        removeStation();
                        
                    }}/>
                    :
                    <Button title="Añadir a favoritos" onPress={()=>{
                        console.log("consulta añade estacion con ID:", id);
                        console.log("user_ID:", user);
                        user ? saveStation() : alert()
                        
                    }}/>
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
