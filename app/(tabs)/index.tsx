import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import { colorsList, constants } from "../constants/Constants";
import Card from "@/app/components/Card";


export default function Index() {
	
	const [textOrigen, onChangeTextOrigen] = useState('')
	const [textDestino, onChangeTextDestino] = useState('')
	const [estaciones, setEstaciones] = useState( [{ nombre: '', lineas: [''], data: [{}] }] );

	useEffect(()=>{

		setTimeout(() => {
			setEstaciones(
				[
					{
						nombre: "Plaza del Rosel y San Blas",
						lineas:[
							"L2a", "L2b",
						],
						data:[
							
							{ 
								type: 'service', 
								info: { 
									line: 'L1', 
									timeOfArrival: '10:30', 
									destinationTitle: 'Estación de Soria',
								}
							},
							{ 
								type: 'service', 
								info: { 
									line: 'L2', 
									timeOfArrival: '10:30', 
									destinationTitle: 'Estación de Soria',
								} 
							}]
					},
					{
						nombre: "Constitución",
						lineas:[
							"L1", "L2b", "L2a",
						],
						data:[{ 
							type: 'warning', 
							info: [{
								message: "No hay servicio en la estación",	
							}] 
						}]
					},
					{
						nombre: "Zamora",
						lineas:[
							"L2b", "L2a", "L1e",
						],
						data:[]
					},
					{
						nombre: "Estación de Soria",
						lineas:[
							"L1", "L1e",
						],
						data:[]
					},
				]
			)
		}, 3000);

	})


	return (
		<ScrollView style={{
			backgroundColor: colorsList.light.FULL_WHITE
		}}>
		<View style={{
			margin: 10,
			flexDirection: 'column',
			rowGap: 10,
			alignContent: "center",
			alignItems: "center",
		}}>
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
			<Pressable style={styles.pressable}>
				<Text style={styles.text}>Buscar</Text>
			</Pressable>

			{estaciones.map((estacion: { nombre: string; lineas: string[]; data:any[]}, index) =>(
				<Card key={index} nombre={estacion.nombre} lineas={estacion.lineas} data={estacion.data}/>
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
		fontSize: 24,
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
	text: {
		color: colorsList.light.MAIN_WHITE,
		fontSize: 24,
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