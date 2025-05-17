import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack} from "expo-router";
import { ActivityIndicator, StatusBar, useColorScheme, View } from "react-native";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { colorsList, IconoCTFV } from "./constants/Constants";
import * as SplashScreen from 'expo-splash-screen';

import { Asset } from 'expo-asset'
import { SQLiteProvider } from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'

SplashScreen.preventAutoHideAsync()

const dbName = "metro_soria.db";

const loadDatabase = async()=>{
	const dbAsset = require('@/assets/db/metro_soria.db');
	const dbUri = Asset.fromModule(dbAsset).uri;
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`
	
	const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
	
	//comprobamos si directorio existe
	if(!fileInfo.exists){
		await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {intermediates: true});
	}

	//borramos DB si existe
	try {
		await FileSystem.deleteAsync(dbFilePath);
		console.log("Old DB file deleted");
		
	} catch (error) {
		console.error("No hay archivo DB que borrar");
	}


	//descargamos DB nueva
	try {
		await FileSystem.downloadAsync(dbUri, dbFilePath)
		console.log("Nuevo archivo DB descargado");

		//verificamos descarga de DB
		const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
		if(!fileInfo.exists){
			throw new Error("La descarga de la DB no es válida");
		}

		console.log("La DB está lista en:", dbFilePath);
	} catch (error) {
		console.error("Failed to download DB", error);
		throw error;
		
	}
	console.log();
	
}

export default function RootLayout() {

	const colorScheme = useColorScheme();
	const [fontsLoaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const [dbLoaded, setDbLoaded] = useState(false)

	useEffect(() => {


		const setApp = async() =>{
			try {
				await loadDatabase()
				setDbLoaded(true)
				
			} catch (error) {
				throw error;
			}
			finally{
				SplashScreen.hideAsync()
			}
		}

		if(fontsLoaded){
			setApp()
		}

	}, [fontsLoaded]);


	if(!fontsLoaded || !dbLoaded){
		return(
			<View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
				<ActivityIndicator size="large" color={colorsList.light.ALERT_RED} />
			</View>
		)
	}



	return (
		<React.Suspense 
			// fallback={
			// 	<View style={{flex: 1, backgroundColor: colorsList.light.ALERT_RED}}/>
			// }
		>
			<SQLiteProvider databaseName="metro_soria.db" useSuspense>
				<StatusBar barStyle="default" backgroundColor={colorScheme === 'dark' ? colorsList.light.MAIN_BLACK : colorsList.light.PRIMARY_BLUE} />
				<Stack screenOptions={{
					headerTitle: ()=> IconoCTFV,
					headerStyle: {
						backgroundColor: colorsList.light.PRIMARY_BLUE,
					},
					headerTitleAlign: "center",
				}}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
					<Stack.Screen name="itinerary" />
					<Stack.Screen name="stopViewer" />
				</Stack>
			</SQLiteProvider>

		</React.Suspense>

	)
}
