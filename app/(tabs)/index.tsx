import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { colorsList, constants } from "../constants/Constants";
import SavedStationCard from "@/app/components/SavedStationCard";
import { useSQLiteContext } from "expo-sqlite";


type StationDataItem = 
	{
		type: 'service'; 
		info: {
			line: number;
			timeOfArrival: string;
			destinationTitle: string;
		}; 
	} 
	| 
	{ type: 'warning'; info: {message: string;} };

interface StationInfo {
	id:number,
	name: string,
	lines: number[],
	data: StationDataItem[]
}

export default function Index() {
	
	const [textOrigen, onChangeTextOrigen] = useState('')
	const [textDestino, onChangeTextDestino] = useState('')
	const [estaciones, setEstaciones] = useState<StationInfo[]>([]);

	const db = useSQLiteContext();

	useEffect(()=>{

		setTimeout(() => {
			setEstaciones(
				[{
						id: 15,
						name: "Plaza del Rosel y San Blas",
						lines:[
							3, 4
						],
						data:[
							{ 
								type: 'service', 
								info: { 
									line: 4, 
									timeOfArrival: '10:30', 
									destinationTitle: 'Concatedral',
								}
							},
							{ 
								type: 'service', 
								info: { 
									line: 3, 
									timeOfArrival: '10:35', 
									destinationTitle: 'Las Camaretas',
								} 
							}]
					},
					{
						id: 1,
						name: "Constitución",
						lines:[
							1, 4, 3,
						],
						data:[{ 
							type: 'warning', 
							info: {
								message: "No hay servicio en la estación",	
							} 
						}]
					},
					{
						id: 2,
						name: "Mariano Granados",
						lines:[
							2, 4, 3,
						],
						data:[{ 
							type: 'warning', 
							info: {
								message: "No hay servicio en la estación",	
							} 
						}]
					},
				]
			)
		}, 0);
		
		
	}, [db])
		
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
				<Text style={styles.labelText}>Dónde vas?</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={onChangeTextOrigen}
					value={textOrigen}
					placeholder={"Origen..."}
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={onChangeTextDestino}
					value={textDestino}
					placeholder="Destino..."
				/>
				<Pressable style={styles.pressable} onPress={()=>{
					router.navigate({pathname: '/itinerary', params: {origin: textOrigen, destination: textDestino}})
				}}>
					<Text style={styles.buttonText}>Buscar</Text>
				</Pressable>

				{estaciones.map((estacion) =>(
					<SavedStationCard key={estacion.id} nombre={estacion.name} lineas={estacion.lines} data={estacion.data} />
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
	buttonText: {
		color: colorsList.light.MAIN_WHITE,
		fontSize: constants.text.mainTitleSize,
		textAlign: "center"
	},
	labelText: {
		color: colorsList.light.MAIN_BLACK,
		fontSize: constants.text.mainTitleSize,
		textAlign: "center"
	},
	viewCard:{
		flexDirection: "row",
		columnGap: constants.bounds.padding,
		backgroundColor: colorsList.light.MAIN_WHITE,
		borderColor: colorsList.light.PRIMARY_BLUE,
		borderWidth: 2,
		padding: constants.bounds.padding,
		borderRadius: constants.bounds.radius,
		alignItems: "center",
		justifyContent: "flex-start"
	}
})