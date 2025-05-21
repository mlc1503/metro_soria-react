import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet, Dimensions } from "react-native";
import { colorsList, constants } from "../constants/Constants";
import SavedStationCard from "@/app/components/SavedStationCard";
import { useSQLiteContext } from "expo-sqlite";
import {AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown'


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
	
	const [searchStationId, setSearchStationId] = useState(0)
	const [estaciones, setEstaciones] = useState<StationInfo[]>([]);
	const [isThereData, setIsThereData] = useState(false);

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
			setIsThereData(true)
		}, 0);
		
		
	}, [db])

	const showSavedStations = ()=>{
		if(isThereData){
			return(
				estaciones.map((estacion, index) =>(
					<SavedStationCard key={index} stop_id={estacion.id} nombre={estacion.name} lineas={estacion.lines} data={estacion.data} />
				))
			)
		}
		else{
			return(<Text style={styles.noDataText}>No hay estaciones guardadas en tu usuario</Text>)
		}
	}

	return(
		<AutocompleteDropdownContextProvider>

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
					<Text style={styles.labelText}>Busca una parada</Text>
					
					<AutocompleteDropdown
						clearOnFocus={false}
						closeOnBlur={true}
						closeOnSubmit={false}
						onSelectItem={(value)=>{ 
							if(value){
								setSearchStationId(parseInt(value.id))
							}
						}}
						onClear={()=>setSearchStationId(0)}
						dataSet={[
							{ id: '1', title: "Estación de Soria" },
							{ id: '2', title: "Europa" },
							{ id: '3', title: "Segovia" },
							{ id: '4', title: "Eduardo Saavedra" },
							{ id: '5', title: "Constitución" },
							{ id: '6', title: "Juan Antonio Gaya Nuño" },
							{ id: '7', title: "Hospital" },
							{ id: '8', title: "Polideportivo" },
							{ id: '9', title: "Tejera" },
							{ id: '10', title: "Mariano Granados" },
							{ id: '11', title: "Mariano Vicén" },
							{ id: '12', title: "Los Pajaritos" },
							{ id: '13', title: "Concatedral" },
							{ id: '14', title: "La Arboleda" },
							{ id: '15', title: "Plaza del Rosel y San Blas" },
							{ id: '16', title: "Valladolid" },
							{ id: '17', title: "Zamora" },
							{ id: '18', title: "Piqueras" },
							{ id: '19', title: "Pontevedra" },
							{ id: '20', title: "Centro Comercial Camaretas" },
							{ id: '21', title: "Las Camaretas" },
							{ id: '22', title: "Polígono (Oeste)" },
							{ id: '23', title: "Polígono (Centro)" },
							{ id: '24', title: "Polígono (Este)" },
							{ id: '25', title: "Polígono (Norte)" },
							{ id: '26', title: "Las Casas"}
						]}
						containerStyle={{width: "100%"}}
						suggestionsListContainerStyle={{
							backgroundColor: colorsList.light.MAIN_WHITE, 
							borderColor: colorsList.light.PRIMARY_BLUE, 
							borderWidth: 2,
							shadowColor: colorsList.light.MAIN_BLACK,
						}}
						suggestionsListTextStyle={{
							color: colorsList.light.MAIN_BLACK
						}}
						suggestionsListMaxHeight={Dimensions.get('window').height * 0.2}
						ignoreAccents={true}
						caseSensitive={false}
						trimSearchText={true}
						inputContainerStyle={{
							borderRadius: constants.bounds.padding,
							paddingLeft: constants.bounds.padding,
							backgroundColor: colorsList.light.MAIN_WHITE, 
							borderColor: colorsList.light.PRIMARY_BLUE, 
							borderWidth: 2,
							flexDirection:"row",
							alignContent: "center"
						}}
						textInputProps={{style:{color: colorsList.light.MAIN_BLACK}, placeholder:'Las Camaretas'}}
						inputHeight={50}
					/>
					<Pressable style={styles.pressable} onPress={()=>{
						if(searchStationId != 0){
							router.navigate({pathname: '/stopViewer', params: {stop_id: searchStationId}})
						}
					}}>
						<Text style={styles.buttonText}>Buscar</Text>
					</Pressable>
					
					<View></View>
					
					<Text style={styles.savedStationsText}>Estaciones guardadas</Text>
					{showSavedStations()}

				</View>
			</ScrollView>
		</AutocompleteDropdownContextProvider>

	)
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
		textAlign: "center",
		shadowColor: colorsList.light.MAIN_BLACK,
	},
	labelText: {
		color: colorsList.light.MAIN_BLACK,
		fontSize: constants.text.sectionTitleSize,
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
	},
	noDataText:{
		color: colorsList.light.MAIN_BLACK,
		fontSize: constants.text.mainLabelSize,
		textAlign: "center"
	},
	savedStationsText:{
		color: colorsList.light.MAIN_BLACK,
		fontSize: constants.text.mainTitleSize,
		textAlign: "center"
	}
})