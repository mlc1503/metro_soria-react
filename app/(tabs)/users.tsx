import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Pressable, Image, Alert } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "../constants/Constants";
import { useAuth, User } from "@/app/AuthContext";
import { router, useFocusEffect } from "expo-router";
import { StationData } from "./stops";

function UsersTab(){
    const db = useSQLiteContext();

    const {user, login, logout, register } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [username, setUsername] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);


    useFocusEffect(
		useCallback(()=>{
            
            fetchSavedStations()

            debugUsers()
            
		},[user])
        
	)

    const debugUsers = async()=>{
        try {
            await db.getAllAsync(
                `SELECT * FROM users`
            ).then((result)=> console.log("TODOS USUARIOS:",result))
            

        } catch (error) {
            console.error("Error fetching saved stations:", error);
        }
    }

    function parseEmail(email:string) {

        email = email.toLowerCase().trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)){
            setIsEmailValid(false)
            return false;
        }

        // Disallow potentially dangerous characters
        if (/[<>()\\\/]/.test(email)){
            setIsEmailValid(false)
            return false;
        }

        // Domain validation
        const domain = email.split('@')[1];
        
        // Disallow IP addresses in domain
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)){
            setIsEmailValid(false)
            return false;
        }
        
        // Disallow domains that are too short
        if (domain.length < 4){
            setIsEmailValid(false)
            return false;
        }

        setIsEmailValid(true)
        return true;
    }
    function parseUsername(username:string){

        username = username.toLowerCase().trim()

        // Basic length check
        if (username.length < 4 || username.length > 20) {

            setIsUsernameValid(false)
            return false
        };

        // Allowed character pattern
        const usernameRegex = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
        if (!usernameRegex.test(username)) {

            setIsUsernameValid(false)
            return false
        };

        // Cannot start or end with _ or -
        if (username.startsWith('_') || username.startsWith('-') || 
            username.endsWith('_') || username.endsWith('-')) {

            setIsUsernameValid(false)
            return false;
        }

        // No consecutive __ or -- or _- or -_
        if (/(_{2,}|-{2,}|_-|-_)/.test(username)) {

            setIsUsernameValid(false)
            return false
        };

        // Reserved words check
        const reservedWords = ['admin', 'root', 'system', 'moderator', 'null', 'undefined'];
        if (reservedWords.includes(username.toLowerCase())) {

            setIsUsernameValid(false)
            return false
        };

        setIsUsernameValid(true)
        return true;
    }
    function parsePassword(password:string){
        password = password.toLowerCase().trim();

        if(password == null || password == "" ) {
            console.log('PASSWORD IS FALSE');
             
            setIsPasswordValid(false); return false; 
        }
        
        setIsPasswordValid(true)
        return true;
    }


    const fetchSavedStations = async()=>{
        if(user != null){
            try {
                const result = await db.getAllAsync<{ stop_id: number }>(
                    `SELECT stop_id FROM user_saved_stations WHERE user_id = ?`, 
                    [user.id]
                );
    
                console.log("STATIONS: ",result);
                
    
            } catch (error) {
                console.error("Error fetching saved stations:", error);
            }
        }

    }
    
    if(user){

        return(
            <View>
                <Text>{user.username}</Text>

                <Pressable onPress={()=>{
                    logout()
                    setUsername("")
                    setPassword("")
                }} style={{padding: 3, backgroundColor: 'pink', width: 70, margin: 10}}>
                    <Text>DesLoguear</Text>
                </Pressable>
            </View>
        )


    }
    else{

        if(isRegistering){
            return(

                <View style={{
                    flex: 1,
                    backgroundColor: colorsList.light.PRIMARY_BLUE,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems:"center",
                    padding: constants.bounds.padding
                }}>
                    
                    <View style={{width: "100%", }}>
                        <TextInput style={[styles.textInput, isUsernameValid ? null : styles.alert]} placeholder="Usuario" autoCapitalize="none"
                            onChangeText={(value)=> { if(parseUsername(value)) setUsername(value) }} />

                        <TextInput style={[styles.textInput, isPasswordValid ? null : styles.alert]} placeholder="Contraseña" secureTextEntry={true}
                            onChangeText={(value)=> { if(parsePassword(value)) setPassword(value.toLowerCase().trim()) }} />

                        <TextInput style={[styles.textInput, isEmailValid ? null : styles.alert]} placeholder="Email" autoCapitalize="none"
                            onChangeText={(value)=>{ if(parseEmail(value)) setEmail(value) }} />
                    </View>
                    
                    <View style={{width: "100%", flexDirection: "row", columnGap: constants.bounds.padding}}>
                        <Pressable style={{padding: 3, backgroundColor: 'cyan', width: 70, margin: 10}}
                        onPress={()=>{
                            if(parseEmail(email) && parsePassword(password) && parseUsername(username)){
                                register(username, password, email).then((result)=>{
                                    if(result.success){
                                        console.log("USUARIO REGISTRADO");
                                        setUsername(username)
                                        setPassword(password)
                                        login(username, password)
                                        setIsRegistering(false)
                                    }
                                    else{
                                        console.warn(result.error);
                                        Alert.alert(
                                            "El usuario ya existe!",
                                            "Escoge otro nombre y/o email.",
                                            [{
                                                text: "OK",
                                            }]
                                        )
                                    }
                                })
                            }
                            else{
                                console.warn("registration fields are invalid!");
                            }

                        }}>
                            <Text>Registrar</Text>
                        </Pressable>

                        <Pressable onPress={()=>setIsRegistering(!isRegistering)} style={{padding: 3, backgroundColor: 'indianred', width: 70, margin: 10}}>
                            <Text>noRegistrar</Text>
                        </Pressable>

                    </View>
                </View>
            )
        }

        return(
            <View style={{
                flex: 1,
                backgroundColor: colorsList.light.PRIMARY_BLUE,
                flexDirection: "column",
                justifyContent: "center",
                alignItems:"center",
                padding: constants.bounds.padding
            }}>
                
                <View style={{width: "100%", }}>
                    <TextInput style={[styles.textInput, isUsernameValid ? null : styles.alert]} placeholder="Usuario" autoCapitalize="none"
                        onChangeText={(value)=> { if(parseUsername(value)) setUsername(value.toLowerCase().trim()) }} />

                    <TextInput style={[styles.textInput, isPasswordValid ? null : styles.alert]} placeholder="Contraseña" secureTextEntry={true}
                        onChangeText={(value)=> { if(parsePassword(value)) setPassword(value.toLowerCase().trim()) }} />
                </View>
                <View style={{width: "100%", flexDirection: "row", columnGap: constants.bounds.padding}}>
                    <Pressable style={{padding: 3, backgroundColor: 'cyan', width: 70, margin: 10}}
                    onPress={()=>{
                        if(parseUsername(username) && parsePassword(password)){ login(username, password) }
                        else{ console.warn("login fields are invalid!") }
                    }}>
                        <Text>Loguear</Text>
                    </Pressable>
                    
                    <Pressable onPress={()=>setIsRegistering(!isRegistering)} style={{padding: 3, backgroundColor: 'cyan', width: 100, margin: 10}}>
                        <Text>SetRegister</Text>
                    </Pressable>
                </View>

            </View>
        )
    }
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
    alert: {
        borderColor: colorsList.light.ALERT_RED
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