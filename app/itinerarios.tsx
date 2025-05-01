import { Link, router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

	const {origin, destination} = useLocalSearchParams();

return (
	<View style={{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}}>
		<Text>{origin}</Text>
		<Text>{destination}</Text>

	</View>
);
}
