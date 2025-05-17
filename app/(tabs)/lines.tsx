import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { constants, colorsList } from "../constants/Constants";
import LineCard from "../components/LineCard";
import { useSQLiteContext } from "expo-sqlite";


interface LineDetails{
    id: number,
    origin_stop_name: string
    destination_stop_name: string
    
}

export default function Index() {
    const [lineas, setLineas] = useState<LineDetails[]>([])
    const db = useSQLiteContext();
    
    useEffect(()=>{

        if(lineas.length == 0){
            db.withTransactionAsync(async() => {
                await getLines()
            }).catch((err) =>{throw err;})
        }        

    }, [db])
    
    async function getLines() {
        db.getAllAsync<LineDetails>(`
            SELECT 
                l.id,
                origin.name AS origin_stop_name,
                destination.name AS destination_stop_name
            FROM 
                lines l
                JOIN stops origin ON l.origin_id = origin.stop_id
                LEFT JOIN stops destination ON l.destination_id = destination.stop_id;
        `)
        .then((result)=> {
            setLineas(result) 
        })
        .catch((err) => {
            throw err
        })
    }

    return (
        <ScrollView style={{
            backgroundColor: colorsList.light.FULL_WHITE
        }}>
            <View
                style={{
                    margin: constants.bounds.padding,
                    flexDirection: 'column',
                    rowGap: constants.bounds.padding,
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={styles.labelText}>Líneas</Text>
                
                {lineas.map((lineaItem, index) =>{
                    return(
                        <LineCard 
                            key={index} 
                            id={lineaItem.id}
                            origin_stop_name={lineaItem.origin_stop_name} 
                            destination_stop_name={lineaItem.destination_stop_name} 
                        />
                    )
                })}

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    labelText:{
        fontSize: constants.text.sectionTitleSize,
        fontWeight: "500"
    }
})
