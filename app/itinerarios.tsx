import { getLoadedFonts } from "expo-font";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";


interface RouteData{
	line_id: number,
	line_name: string,
	stop_name: string,
}

export default function Index() {

	const {origin, destination, line_id} = useLocalSearchParams();

	const db = useSQLiteContext();
	const [data, setData] = useState<RouteData[]>([]);

	let id:number;	
	
	useEffect(() => {
		typeof line_id === 'string' ? id = parseInt(line_id) : id = parseInt(line_id[0])
		
		if(origin == null || destination == null){
			db.withTransactionAsync(async () => {
				await getFullRouteData(id)
			})
		}
		
	}, [db])

	async function getFullRouteData(id:number) {
		
		db.getAllAsync<RouteData>(`
			SELECT l.id as line_id, l.line_name AS line_name, s.name AS stop_name
			FROM stops s JOIN route_stations r ON s.stop_id = r.stop_id JOIN lines l ON r.route_id = l.id
			WHERE r.route_id = (
				SELECT lines.id 
				FROM lines 
				WHERE lines.id = ?
			);
		`, [id])
		.then((result) =>{
			setData(result)
		})
		.catch((err)=>{
			console.error("GET ITINERARIO FAILED", err);
		})
	}

return (
	<View style={{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}}>
		<Text>ORIGIN_ID{origin}</Text>
		<Text>DESTINATION_ID{destination}</Text>
		<Text>LINE_ID {line_id}</Text>


		{data.map((item, index) =>{
			return(
				<Text key={index}>{item.line_name} - {item.stop_name}</Text>
			)
		})}

	</View>
);
}
