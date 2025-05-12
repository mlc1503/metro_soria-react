import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colorsList, constants, getArrayIconoLineas } from "./constants/Constants";
import ItineraryItem from "./components/ItineraryItem";


interface RouteData{
	line_id: number,
	line_name: string,
	stop_id: number,
	stop_name: string,
}

interface RouteStations{
	stop_id: number,
	line_id: number
}

class ItineraryStation {
	station_id: number;
	name:string;
	correspondences:number[];

	public constructor(station_id:number, name:string, correspondences:number[]) {
		this.station_id = station_id,
		this.name = name,
		this.correspondences = correspondences;
	}
}


export default function Index() {

	const {origin, destination, line_id} = useLocalSearchParams();

	const db = useSQLiteContext();

	const [itinerary, setItinerary] = useState<ItineraryStation[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [labelLine, setLabelLine] = useState('test');

	let id:number = typeof line_id === 'string' ? parseInt(line_id) : parseInt(line_id[0])
	
	useEffect(() => {
		
		loadData(id)
		setIsLoading(false)
		
	}, [db])

	const loadData = async (id:number)=> {

		//TODO: MODIFICAR DATOS EN BD Y CONSULTA PARA COGER TAMBIÉN LA ÚLTIMA ESTACIÓN DE LA LÍNEA
		
		const route_data = db.getAllAsync<RouteData>(`
								SELECT l.id as line_id, l.line_name AS line_name, s.stop_id, s.name AS stop_name
								FROM stops s 
									JOIN route_stations r ON s.stop_id = r.stop_id 
									JOIN lines l ON r.route_id = l.id
								WHERE l.id = ?;
							`, [id])

		const all_route_stations = db.getAllAsync<RouteStations>(`
										SELECT r.stop_id, l.id as line_id 
										FROM route_stations r 
											JOIN lines l ON l.id = r.route_id;
									`)
		

		let itinerary:ItineraryStation[] = [];
		

		(await route_data).forEach(async estacion =>{

			let line_correspondences_of_station:number[] = [];

			//finds ocurrences of station_id in all the route_stations
			let entries = (await all_route_stations).filter((rs)=> rs.stop_id == estacion.stop_id)
	
			entries.forEach(entry => {
				line_correspondences_of_station.push(entry.line_id)
			});
	
			itinerary.push(new ItineraryStation(estacion.stop_id, estacion.stop_name, line_correspondences_of_station));
			
		}, [])
		setItinerary(itinerary)
	}

	const label = async () => {
		if(labelLine == 'test'){
			setLabelLine(itinerary[0].name + ' - ' + itinerary[itinerary.length	-1].name);
		}
	}

	label()

	if(isLoading){
		return(
			<View style={{
				margin: constants.bounds.padding,
				flexDirection: 'column',
				rowGap: constants.bounds.padding,
				alignContent: "center",
				alignItems: "center",
			}}>
				<Text>FETCHEANDO DATOS...</Text>
			</View>
		)
	}
	
	return (
		<View style={{
			margin: constants.bounds.padding,
			flexDirection: 'column',
			rowGap: constants.bounds.padding,
			alignContent: "center",
			alignItems: "center",
		}}>

			{getArrayIconoLineas([id], 50)}

			<Text style={styles.labelText}>{labelLine}</Text>

			{itinerary.map((item, index) =>{
				return(
					<Text key={index}>{item.name}</Text>
					// <ItineraryItem key={index} station_id={item.station_id} name={item.name} correspondences={item.correspondences}/>
				)
			})}

		</View>
	);
}

const styles = StyleSheet.create({
	labelText: {
		fontSize: constants.text.mainTitleSize,
        fontWeight: "500",
        textAlign: "center"
	},
})