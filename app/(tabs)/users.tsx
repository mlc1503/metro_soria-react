import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Pressable, Image } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "../constants/Constants";
import { useAuth, User } from "@/app/AuthContext";
import { router } from "expo-router";
import { StationData } from "./stops";

function UsersTab(){
    const db = useSQLiteContext();

    const {user, login, logout } = useAuth()
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //debug parameters, me canso de poner el usuario todo el rato
    const [username, setUsername] = useState("manel");
    const [password, setPassword] = useState("1234");


    const station_element = (item:StationData, index: number)=>{
            return(
                <Pressable onPress={()=> router.push({pathname: '/stopViewer', params: {stop_id: item.id}})} key={index}>
                    <View style={{
                        width: "100%",
                        minHeight: 90,
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
            backgroundColor: colorsList.light.FULL_WHITE,
        }}>
            <View style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                rowGap: constants.bounds.padding,
                padding: constants.bounds.padding,
            }}>
                <Image source={require('@/assets/images/fgc.jpeg')} style={{borderRadius:100, maxHeight: 50, aspectRatio: 1, backgroundColor: 'red'}}/>
                <Text style={styles.usernameLabel}>Manel Lagunas</Text>

                <View style={{width:"100%"}}>
                    <Text style={styles.propertyLabel}>password: ********</Text>
                    <Text style={styles.propertyLabel}>email: manel@email.com</Text>
                </View>
                <View style={{width: "100%", flexDirection: "row-reverse", columnGap: constants.bounds.padding / 2}}>
                    <Button title="Editar" color={colorsList.light.PRIMARY_BLUE}/>
                    <Button title="Eliminar" color={colorsList.light.ALERT_RED}/>
                </View>

                <Text style={styles.savedStationsDivLabel}>Tus estaciones guardadas</Text>

                <View>
                    <View style={{backgroundColor: "lightslategrey", minHeight: 1}}/>
                    {station_element(new StationData(1, "Estación de soria", [1,2]), 1)}
                    <View style={{backgroundColor: "lightslategrey", minHeight: 1}}/>
                    {station_element(new StationData(1, "Estación de soria", [1,2]), 2)}
                </View>
                
            </View>
        </ScrollView>

    );   
}

export default UsersTab;

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderRadius: constants.bounds.radius,
        padding: constants.bounds.padding,
        backgroundColor: colorsList.light.MAIN_WHITE,
        borderColor: colorsList.light.PRIMARY_BLUE,
        fontSize: constants.text.mainTitleSize,
        color: colorsList.light.PRIMARY_BLUE,
        width: "100%"
    },
    pressable: {
        backgroundColor: colorsList.light.PRIMARY_BLUE,
        borderRadius: constants.bounds.radius,
        paddingLeft: constants.bounds.padding * 2.2,
        paddingRight: constants.bounds.padding * 2.2,
        paddingTop: constants.bounds.padding * 0.8,
        paddingBottom: constants.bounds.padding * 0.8,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: colorsList.light.MAIN_WHITE,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center",
        shadowColor: colorsList.light.MAIN_BLACK,
    },
    usernameLabel: {
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center"
    },
    propertyLabel:{
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainLabelSize,
    },
    viewCard:{
        flexDirection: "row",
        columnGap: constants.bounds.padding,
        backgroundColor: colorsList.light.MAIN_WHITE,
        borderColor: colorsList.light.PRIMARY_BLUE,
        borderWidth: 2,
        padding: constants.bounds.padding,
        borderRadius: constants.bounds.radius,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    noDataText:{
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainLabelSize,
        textAlign: "center"
    },
    savedStationsDivLabel:{
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center"
    },
    station_text:{
        fontSize: constants.text.mainLabelSize,
        fontWeight: "600",
        maxWidth: "60%"
    }
})