import { Link, router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView, StyleSheet } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "@/app/constants/Constants";


class StationData{
    id:number;
    name:string;
    correspondences: number[];

    constructor(id:number, name:string, correspondences:number[]){
        this.id = id
        this.name = name
        this.correspondences = correspondences;
    }
}


interface incoming_stationData{
    id:number,
    name:string,
    correspondences:string;
}

export default function Index() {

    const db = useSQLiteContext();
    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState<StationData[]>([]);

    useEffect(()=>{
        loadData();
    }, [db])


    
    const loadData = async()=>{
        let station_array:StationData[] = [];

        if(data.length == 0){
            const db_data = await db.getAllAsync<incoming_stationData>(`
                SELECT 
                    s.stop_id as id,
                    s.name AS name,
                    json_group_array(DISTINCT rs.route_id) AS correspondences
                FROM 
                    stops s
                LEFT JOIN 
                    route_stations rs ON s.stop_id = rs.stop_id
                GROUP BY 
                    s.stop_id, s.name
                ORDER BY 
                    s.name;
            `).catch((err)=> {throw err})
            
            db_data.forEach(station => {
                let correspondences_array:number[] = JSON.parse(station.correspondences)
    
                station_array.push(new StationData(station.id, station.name, correspondences_array))
            });

            setData(station_array)
        }
    }
    
    console.log(data);
    

    const station_element = (item:StationData, index: number)=>{
        return(
            <Pressable onPress={()=> router.push({pathname: '/stopViewer', params: {stop_id: item.id}})} key={index}>
                <View style={{
                    width: "100%",
                    minHeight: 90,
                    // backgroundColor: 'red',
                    paddingLeft: constants.bounds.padding,
                    paddingRight: constants.bounds.padding,

                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                        <Text style={styles.station_text}>{item.name}</Text>
                        <View style={{
                            flexDirection: "row",
                            columnGap: constants.bounds.padding
                        }}>
                            {
                                getArrayIconoLineas(item.correspondences, 30)
                            }

                        </View>
                </View>
            </Pressable>
        )
    }

    return (

        <ScrollView style={{
            backgroundColor: colorsList.light.FULL_WHITE
        }}>
            <View style={{
                margin: constants.bounds.padding,
                flexDirection: 'column',
                // rowGap: constants.bounds.padding,
                alignContent: "center",
                alignItems: "center",
            }}>
                
                <Text style={styles.sectionText}>Paradas</Text>

                {
                    data.map((item, index) =>{
                        return(station_element(item, index))
                    })
                }


            </View>
        </ScrollView>

    );
}
const styles = StyleSheet.create({
    sectionText:{
        fontSize: constants.text.sectionTitleSize,
        fontWeight: "500"
    },
    station_text:{
        fontSize: constants.text.mainLabelSize,
        fontWeight: "600",
        maxWidth: "60%"
    }

})
