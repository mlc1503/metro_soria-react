import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}



	return (
		// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false,}}/>
			<Stack.Screen name="+not-found"/>
			<Stack.Screen name="itinerarios"/>
		</Stack>
		// </ThemeProvider>
	)
}
