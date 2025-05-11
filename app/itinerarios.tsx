import { Link, router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

	const {origin, destination, line_id} = useLocalSearchParams();

return (
	<View style={{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}}>
		<Text>ORIGIN_ID{origin}</Text>
		<Text>DESTINATION_ID{destination}</Text>
		<Text>LINE_ID {line_id}</Text>

	</View>
);
}
