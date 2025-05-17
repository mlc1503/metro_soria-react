import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { colorsList, constants, getArrayIconoLineas, } from "./constants/Constants";
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

	const {line_id} = useLocalSearchParams();

	const db = useSQLiteContext();

	const [itinerary, setItinerary] = useState<ItineraryStation[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [labelLine, setLabelLine] = useState('test');

	let id:number = typeof line_id === 'string' ? parseInt(line_id) : parseInt(line_id[0])
	
	useEffect(() => {
		
		loadData(id)
		console.log("ITINERARY_LENGTH",itinerary.length);
		 
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
							`, [id]).catch((err) =>{throw err;})

		const all_route_stations = db.getAllAsync<RouteStations>(`
									SELECT r.stop_id, l.id as line_id 
									FROM route_stations r 
										JOIN lines l ON l.id = r.route_id
									WHERE l.id NOT LIKE ?;
									`, id).catch((err) =>{throw err;})
		
		

		let itinerary:ItineraryStation[] = [];
		

		(await route_data).forEach(async estacion =>{

			let line_correspondences_of_station:number[] = [];
			let entries_map = new Map<number, number>()

			//finds all ocurrences of station_id in all the route_stations
			let entries = (await all_route_stations).filter((rs)=> rs.stop_id == estacion.stop_id)
			
			entries.forEach(entry => {
				entries_map.set(entry.line_id, entry.line_id)
			});

			line_correspondences_of_station = Array.from(entries_map.values())
	

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

	if(isLoading){ return(
		<View style={{
			margin: constants.bounds.padding,
			flexDirection: 'column',
			rowGap: constants.bounds.padding,
			alignContent: "center",
			alignItems: "center",
		}}>
			<Text>RECOGIENDO DATOS...</Text>
		</View>
	)}
	
	return (
		<ScrollView style={{
            backgroundColor: colorsList.light.FULL_WHITE
        }}>
			<View style={{
				margin: constants.bounds.padding,
				flexDirection: 'column',
				rowGap: constants.bounds.padding,
				alignContent: "center",
				alignItems: "center",
			}}>

				{getArrayIconoLineas([id], 50)}

				<Text style={styles.labelText}>{labelLine}</Text>

				<View style={{width: "100%"}}>
					{/* //TODO BUG_FOUND: a veces este elemento no se renderiza. Solo se muestra el labelLine con 'test' */}
					{itinerary.map((item, index) =>{
						let itinerary_item_type:'start' | 'end' | null = null;

						if(index == 0) itinerary_item_type = 'start'
						else if(index == itinerary.length-1) itinerary_item_type = 'end'
						
						return (
							<ItineraryItem 
								key={index} 
								line_id={id}
								station_id={item.station_id} 
								name={item.name} 
								correspondences={item.correspondences} 
								item_type={itinerary_item_type}
							/>
						)
					})}
				</View>

			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	labelText: {
		fontSize: constants.text.mainTitleSize,
        fontWeight: "500",
        textAlign: "center"
	},
})