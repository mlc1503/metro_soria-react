import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from "react-native";
import { colorsList, constants } from "../constants/Constants";
import { useAuth } from "@/app/AuthContext";

function UsersTab(){
    const db = useSQLiteContext();

    const {user, login, logout } = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return (

        
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

                    {user ? 
                        <View>
                            <Text>Welcome, {user.username}!</Text>
                            <Text>You are now logged in.</Text>
                            <Text>ID: {user.id}</Text>
                        </View> 
                    : 
                        <View style={{width: "100%"}}>
                            <TextInput placeholder="user" onChangeText={(value)=>setUsername(value.trim())} style={styles.textInput} autoCapitalize="none"/>
                            <TextInput placeholder="psw" onChangeText={(value)=>setPassword(value.trim())} style={styles.textInput} autoCapitalize="none"/>
                        </View>
                    }

                    <Button title={user ? "Desloguear" : "Logear"} onPress={()=>{

                        if(user){
                            logout()
                            console.log("Already logged in");
                            
                        }
                        else{
                            if(username != "" && password != ""){
                                login(username, password)
                            }
                            else{
                                console.log("username and psq are empty");
                            }
                        }
                    }}/>
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
    labelText: {
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.sectionTitleSize,
        textAlign: "center"
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
    savedStationsText:{
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center"
    }
})