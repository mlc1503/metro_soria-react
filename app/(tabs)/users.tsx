import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "../constants/Constants";
import { useAuth } from "@/app/AuthContext";
import { router, useFocusEffect } from "expo-router";
import { StationData } from "./stops";

function UsersTab(){
    const db = useSQLiteContext();

    const {user, login, logout, register } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [userSavedStations, setUserSavedStations] = useState<StationData[]>([]);

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

    console.log("SAVED_STATIONS", userSavedStations);
    

    const debugUsers = async()=>{
        try {
            db.getAllAsync(
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
                let station_array:StationData[] = [];
                const db_data = await db.getAllAsync<{
                    id:number,
                    name:string,
                    correspondences:string;
                }>(`
                    SELECT 
                        s.stop_id as id,
                        s.name AS name,
                        json_group_array(DISTINCT rs.route_id) AS correspondences
                    FROM 
                        stops s
                    LEFT JOIN 
                        route_stations rs ON s.stop_id = rs.stop_id
                    WHERE s.stop_id IN(SELECT stop_id FROM user_saved_stations WHERE user_id = ?)
                    GROUP BY 
                        s.stop_id, s.name
                    ORDER BY 
                        s.name;
    
                `, [user.id]).catch((err)=> {throw err})
                
                db_data.forEach(station => {
                    let correspondences_array:number[] = JSON.parse(station.correspondences)
                    
        
                    station_array.push(new StationData(station.id, station.name, correspondences_array))
                });
                
                setUserSavedStations(station_array)
            } catch (error) {
                console.error("Error fetching saved stations:", error);
            }
        }

    }

    function station_element(item:StationData, index: number){
        return(
            <View style={savedStationStyle.stationItemContainer}>
                <View style={savedStationStyle.divider} />
                <Pressable key={index}
                    onPress={() => router.push({ pathname: '/stopViewer', params: { stop_id: item.id } })}
                >
                    <View style={savedStationStyle.stationPressableContainer}>
                        <Text style={savedStationStyle.station_text}>{item.name}</Text>

                        <View style={savedStationStyle.lineIconsContainer}>{getArrayIconoLineas(item.correspondences, 30)}</View>
                    </View>
                </Pressable>
            </View>

        )
    }
    
    if(user){

        return(
            <ScrollView 
                style={userScreenStyle.scrollView}
                contentContainerStyle={userScreenStyle.scrollContent}
            >
                <View style={userScreenStyle.userHeader}>
                    <Image 
                        source={require('@/assets/images/fgc.jpeg')} 
                        style={userScreenStyle.userImage}
                    />
                    <Text style={userScreenStyle.usernameLabel}>{user.username}</Text>
                </View>

                <View style={{ width: "100%" }}>
                    <Text style={userScreenStyle.propertyLabel}>Email: <Text style={userScreenStyle.propertyLabel}>{user.email}</Text></Text>
                    <Text style={userScreenStyle.propertyLabel}>Contraseña: <Text style={userScreenStyle.propertyLabel}>********</Text></Text>
                </View>

                <View style={userScreenStyle.buttonContainer}>
                    <Pressable style={[userScreenStyle.actionButton, userScreenStyle.editButton]}>
                        <Text style={userScreenStyle.buttonText}>EDITAR</Text>
                    </Pressable>
                    
                    <Pressable style={[userScreenStyle.actionButton, userScreenStyle.deleteButton]}>
                        <Text style={userScreenStyle.buttonText}>ELIMINAR</Text>
                    </Pressable>
                </View>

                <Text style={userScreenStyle.savedStationsDivLabel}>Tus estaciones guardadas</Text>

                <View>{userSavedStations.map((value, index) => station_element(value, index))}</View>

                <Pressable style={userScreenStyle.pressable}
                    onPress={() => {
                        logout();
                        setUsername("");
                        setPassword("");
                        setUserSavedStations([]);
                }}>
                <Text style={userScreenStyle.buttonText}>CERRAR SESIÓN</Text>
                </Pressable>

                <View style={userScreenStyle.spacer}/>
            </ScrollView>
        )
    }
    else{

        if(isRegistering){
            return(
            <View style={registerScreenStyle.registerContainer}>
                <View style={registerScreenStyle.registerFormContainer}>
                    <Text style={registerScreenStyle.loginText}>Regístrate</Text>

                    <View style={registerScreenStyle.inputFieldContainer}>

                        <TextInput style={[loginScreenStyle.textInput, isUsernameValid ? null : loginScreenStyle.alert]} placeholder="Usuario" autoCapitalize="none"
                            onChangeText={(value) => { if(parseUsername(value)) setUsername(value) }} 
                        />
                        <View>
                            <Text style={[registerScreenStyle.parseErrorText, isUsernameValid ? registerScreenStyle.errorTextNotVisible : null]}>
                                El usuario no es válido!
                            </Text>
                        </View>
                    </View>

                    <View style={registerScreenStyle.inputFieldContainer}>

                        <TextInput style={[loginScreenStyle.textInput, isPasswordValid ? null : loginScreenStyle.alert]} placeholder="Contraseña" secureTextEntry={true}
                            onChangeText={(value) => { if(parsePassword(value)) setPassword(value.toLowerCase().trim()) }} 
                        />
                        <View>
                            <Text style={[registerScreenStyle.parseErrorText, isPasswordValid ? registerScreenStyle.errorTextNotVisible : null]}>
                                La contraseña no es válida!
                            </Text>
                        </View>
                    </View>

                    <View style={registerScreenStyle.inputFieldContainer}>

                        <TextInput autoCapitalize="none" placeholder="Email" style={[loginScreenStyle.textInput, isEmailValid ? null : loginScreenStyle.alert]} 
                            onChangeText={(value) => { if(parseEmail(value)) setEmail(value) }} 
                        />
                        <View>
                            <Text style={[registerScreenStyle.parseErrorText, isEmailValid ? registerScreenStyle.errorTextNotVisible : null]}>
                                El email no es válido!
                            </Text>
                        </View>
                    </View>
                </View>
                
                <View style={registerScreenStyle.registerButtonRow}>
                    <Pressable 
                        style={registerScreenStyle.registerButton}
                        onPress={() => {
                        if(parseEmail(email) && parsePassword(password) && parseUsername(username)) {
                            register(username, password, email).then((result) => {
                            if(result.success) {
                                console.log("USUARIO REGISTRADO");
                                setUsername(username);
                                setPassword(password);
                                login(username, password);
                                setIsRegistering(false);
                            } else {
                                console.warn(result.error);
                                Alert.alert(
                                "El usuario ya existe!",
                                "Escoge otro nombre y/o email.",
                                [{ text: "OK" }]
                                );
                            }
                            });
                        } else {
                            console.warn("registration fields are invalid!");
                        }
                    }}>
                        <Text style={[loginScreenStyle.buttonText]}>Registrar</Text>
                    </Pressable>

                    <Pressable style={[loginScreenStyle.registerLinkPressable]}
                        onPress={() => setIsRegistering(!isRegistering)
                    }>
                        <Text style={loginScreenStyle.registerLinkText}>Iniciar sesión</Text>
                    </Pressable>
                </View>
            </View>
            )
        }

        return(
            <View style={loginScreenStyle.loginContainer}>
                <Text style={loginScreenStyle.loginText}>Inicia sesión</Text>
                
                <View style={loginScreenStyle.inputContainer}>
                    <TextInput 
                        style={[loginScreenStyle.textInput, isUsernameValid ? null : loginScreenStyle.alert]} 
                        placeholder="Usuario" 
                        autoCapitalize="none"
                        onChangeText={(value) => { 
                        if (parseUsername(value)) setUsername(value.toLowerCase().trim()) 
                    }}/>

                    <TextInput 
                        style={[loginScreenStyle.textInput, isPasswordValid ? null : loginScreenStyle.alert]} 
                        placeholder="Contraseña" 
                        secureTextEntry={true}
                        onChangeText={(value) => { 
                        if (parsePassword(value)) setPassword(value.toLowerCase().trim()) 
                    }}/>
                </View>

                <View style={loginScreenStyle.buttonRow}>
                    <Pressable style={[loginScreenStyle.actionButton]}
                        onPress={() => {
                        if (parseUsername(username) && parsePassword(password)) { 
                            login(username, password) 
                        } else { 
                            console.warn("login fields are invalid!");
                        }
                    }}>
                        <Text style={loginScreenStyle.buttonText}>Entrar</Text>
                    </Pressable>
                    
                </View>
                <Pressable style={[loginScreenStyle.registerLinkPressable]}
                    onPress={() => setIsRegistering(!isRegistering)
                }>
                    <Text style={loginScreenStyle.registerLinkText}>Registrarse</Text>
                </Pressable>
            </View>
        )
    }
}

export default UsersTab;

const userScreenStyle = StyleSheet.create({
    scrollView: {
        backgroundColor: colorsList.light.FULL_WHITE,
        padding: constants.bounds.padding,
    },
    scrollContent: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: constants.bounds.padding,
    },
    userHeader: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        rowGap: constants.bounds.padding,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row-reverse",
        columnGap: constants.bounds.padding / 2,
    },
    actionButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: constants.bounds.padding,
        borderRadius: constants.bounds.radius,
    },
    editButton: {
        backgroundColor: colorsList.light.PRIMARY_BLUE,
    },
    deleteButton: {
        backgroundColor: colorsList.light.ALERT_RED,
    },
    spacer: {
        height: 50,
    },
        // Reuse existing styles from your previous StyleSheet
    usernameLabel: {
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center"
    },
    propertyLabel: {
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainLabelSize,
    },
    buttonText: {
        color: colorsList.light.MAIN_WHITE,
        fontSize: constants.text.mainLabelSize,
        textAlign: "center",
        shadowColor: colorsList.light.MAIN_BLACK,
    },
    savedStationsDivLabel: {
        color: colorsList.light.MAIN_BLACK,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center"
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
})

const savedStationStyle = StyleSheet.create({
    
    stationItemContainer: {
        width: "100%",
    },
    divider: {
        backgroundColor: 'lightslategray',
        height: 1,
    },
    stationPressableContainer: {
        width: "100%",
        minHeight: 90,
        paddingLeft: constants.bounds.padding,
        paddingRight: constants.bounds.padding,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    lineIconsContainer: {
        flexDirection: "row",
        columnGap: constants.bounds.padding,
    },
    // Reusing your existing station_text style
    station_text: {
        fontSize: constants.text.mainLabelSize,
        fontWeight: "600",
        maxWidth: "60%"
    }
});

const loginScreenStyle = StyleSheet.create({
  
    loginContainer: {
        flex: 1,
        backgroundColor: colorsList.light.PRIMARY_BLUE,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: constants.bounds.padding,
        rowGap: constants.bounds.padding
    },
    inputContainer: {
        width: "100%",
        rowGap: constants.bounds.padding
    },
    buttonRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: constants.bounds.padding
    },
    actionButton: {
        width: "40%",
        padding: constants.bounds.padding,
        backgroundColor: colorsList.light.PRIMARY_CYAN,
        borderWidth: 1,
        borderRadius: constants.bounds.padding,
        borderColor: colorsList.light.PRIMARY_CYAN
    },
    registerLinkPressable: {
        alignItems: "center",
        justifyContent: "center"
    },
    registerLinkText: {
        fontSize: constants.text.mainLabelSize,
        color: colorsList.light.MAIN_WHITE,
        textDecorationLine: "underline"
    },
    buttonText: {
        color: colorsList.light.MAIN_WHITE,
        fontSize: constants.text.mainLabelSize,
        textAlign: "center",
    },
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
    loginText: {
        color: colorsList.light.MAIN_WHITE,
        fontSize: constants.text.mainTitleSize,
        fontWeight: "500",
        textAlign: "center"
    }
});

const registerScreenStyle = StyleSheet.create({
  
    registerContainer: {
        flex: 1,
        backgroundColor: colorsList.light.PRIMARY_BLUE,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: constants.bounds.padding
    },
    registerFormContainer: {
        width: "100%",
        rowGap: constants.bounds.padding
    },
    inputFieldContainer: {
        rowGap: constants.bounds.padding / 2
    },
    registerButtonRow: {
        width: "40%",
        columnGap: constants.bounds.padding,
        justifyContent: 'center'
    },
    registerButton: {
        padding: constants.bounds.padding,
        backgroundColor: colorsList.light.PRIMARY_CYAN,
        margin: constants.bounds.padding,
        alignItems: 'center',
        borderRadius: constants.bounds.radius
    },
    cancelButton: {
        padding: constants.bounds.padding,
        backgroundColor: colorsList.light.ALERT_RED,
        margin: constants.bounds.padding,
        alignItems: 'center',
        borderRadius: constants.bounds.radius
    },
    loginText: {
        color: colorsList.light.MAIN_WHITE,
        fontSize: constants.text.mainTitleSize,
        textAlign: "center",
        marginBottom: constants.bounds.padding
    },
    alert: {
        color: colorsList.light.ALERT_RED
    },
    parseErrorText:{
        paddingLeft: constants.bounds.padding,
        color: colorsList.light.ALERT_RED
    },
    errorTextNotVisible: {
        display: "none"
    },
});