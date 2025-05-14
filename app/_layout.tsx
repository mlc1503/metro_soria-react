import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack} from "expo-router";
import { StatusBar, useColorScheme, View } from "react-native";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { colorsList, IconoCTFV } from "./constants/Constants";
import * as SplashScreen from 'expo-splash-screen';

import { Asset } from 'expo-asset'
import { SQLiteProvider } from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'

SplashScreen.preventAutoHideAsync()

const loadDatabase = async()=>{
	const dbName = "metro_soria.db";
	const dbAsset = require('@/assets/db/metro_soria.db');
	const dbUri = Asset.fromModule(dbAsset).uri;
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`
	
	const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
	
	if(!fileInfo.exists){
		await FileSystem.makeDirectoryAsync(
			`${FileSystem.documentDirectory}SQLite`, 
			{intermediates: true}
		);
	}
	await FileSystem.downloadAsync(dbUri, dbFilePath)
	console.log("se ha descargado el fichero .db al dispositivo");
}

export default function RootLayout() {

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const [dbLoaded, setDbLoaded] = useState(false)

	

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}

		loadDatabase()
			.then(()=> {
				setDbLoaded(true); 
				console.log("se ha cargado la bd");
			})
			.catch((error) => console.error("Un error ha ocurrido al cargar la DB.\n",error))
	}, [loaded, dbLoaded]);

	if (!loaded) {
		return null;
	}



	return (
		<React.Suspense 
			// fallback={
			// 	<View style={{flex: 1, backgroundColor: colorsList.light.ALERT_RED}}/>
			// }
		>
			<SQLiteProvider databaseName="test.db" useSuspense>
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
