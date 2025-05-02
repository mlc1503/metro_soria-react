import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { constants, colorsList, listaIconos } from "../constants/Constants";
import LineCard from "../components/LineCard";

type LineDetails = {
    nameId: string,
    origin:{
        id: number,
        name: string,
    }
    destination?:{
        id: number,
        name: string,
    }
}

export default function Index() {
    const [lineas, setLineas] = useState(Array<LineDetails>)
    useEffect(()=>{
        setTimeout(() => {
            setLineas([
                {
                    nameId: 'L1',
                    origin:{
                        id: 1,
                        name: "Estación de Soria"
                    },
                },
                {
                    nameId: 'L1e',
                    origin:{
                        id: 1,
                        name: "Estación de Soria"
                    },
                    destination: {
                        id: 8,
                        name: "Las Camaretas"
                    }
                },
                {
                    nameId: 'L2b',
                    origin:{
                        id: 1,
                        name: "Concatedral"
                    },
                    destination: {
                        id: 18,
                        name: "Las Casas"
                    }
                },
            ])
        }, 1000);
    })

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
                        <LineCard key={index} nameId={lineaItem.nameId} origin={lineaItem.origin} destination={lineaItem.destination}/>
                    )
                })}

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    labelText:{
        fontSize: constants.text.mainTitleSize,
        fontWeight: "500"
    },
    lineaCard: {

    },
})
