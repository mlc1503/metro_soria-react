import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { constants, colorsList, listaIconos } from "../constants/Constants";

export default function Index() {
    // const [lineas, setLineas] = useState([{}])
    // useEffect(()=>{
    //     setTimeout(() => {
    //         setLineas([
    //             {
    //                 lineNumber: 'L1',
    //                 destino: ''
    //             }
    //         ])
    //     }, 1000);
    // })

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
            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    labelText:{
        fontSize: constants.text.mainTitleSize,
        fontWeight: "semibold"
    },
    lineaCard: {

    },
})
