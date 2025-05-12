import { getLoadedFonts } from "expo-font";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { constants, getArrayIconoLineas } from "./constants/Constants";


interface RouteData{
	line_id: number,
	line_name: string,
	stop_id: number,
	stop_name: string,
}

interface RouteStations{
	stop_id: number,
	line_name: string
}

class ItineraryStation {
	station_id: number;
	name:string;
	correspondences:string[];

	public constructor(station_id:number, name:string, correspondences:string[]) {
		this.station_id = station_id,
		this.name = name,
		this.correspondences = correspondences;
	}
}


export default function Index() {

	const {origin, destination, line_id} = useLocalSearchParams();

	const db = useSQLiteContext();
	const [data, setData] = useState<RouteData[]>([]);

	const [route_stations, setRouteStations] = useState<RouteStations[]>([]);

	let itinerary:ItineraryStation[] = [];

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
			SELECT l.id as line_id, l.line_name AS line_name, s.stop_id, s.name AS stop_name
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

		db.getAllAsync<RouteStations>(`SELECT r.stop_id, l.line_name FROM route_stations r JOIN lines l ON l.id = r.route_id;`)
			.then((result)=> setRouteStations(result))
			.catch((err)=>console.error("GET ROUTE_STATIONS ITINERARIO FAILED",err))	
	}


	if(itinerary.length == 0){

		data.forEach(estacion => {
	
			// console.log(estacion);
			let route_lines_array_by_station:string[] = [];
			let entries = route_stations.filter((rs)=> rs.stop_id == estacion.stop_id)
	
			entries.forEach(entry => {
				route_lines_array_by_station.push(entry.line_name)
			});
	
			itinerary.push(new ItineraryStation(estacion.stop_id, estacion.stop_name, route_lines_array_by_station));
			
		});
		
		console.log("ITINERARIO COMPLETO\n", itinerary);
	}


	return (
		<View style={{
			margin: constants.bounds.padding,
			flexDirection: 'column',
			rowGap: constants.bounds.padding,
			alignContent: "center",
			alignItems: "center",
		}}>
			<Text>ORIGIN_ID{origin}</Text>
			<Text>DESTINATION_ID{destination}</Text>
			<Text>LINE_ID {line_id}</Text>

			{/* {
				let imageSource
			} */}


			{itinerary.map((item, index) =>{
				return(
					<View key={index}>
						{/* {if} */}
						
					</View>
				)
			})}

		</View>
	);
}
