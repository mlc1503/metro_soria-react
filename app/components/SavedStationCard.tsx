import { Text, View, StyleSheet, Pressable } from 'react-native'
import { colorsList, constants, getArrayIconoLineas } from "../constants/Constants";
import { router } from 'expo-router';

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

interface SavedStationCardProps{
	stop_id:number,
	nombre: string;
	lineas: number[];
	data: StationDataItem[];
}

export default function SavedStationCard({stop_id, nombre, lineas, data }: SavedStationCardProps){

	//TODO: calcular tiempo restante hasta paso de tren por estación (probablemente con useEffect y useState

	return (
		//TODO: vincular tarjeta con vista de parada
		<View style={{width: "100%"}}>
			<Pressable style={styles.savedStationCard} onPress={()=>{
				router.navigate({pathname: '/stopViewer' , params: {stop_id: stop_id}})
			}}>

				<View style={styles.lineasNombreDiv}>
					<Text style={{fontSize: constants.text.mainTitleSize, fontWeight: "500"}}>{nombre}</Text>
					<View style={{flexDirection: 'row', columnGap: constants.bounds.padding}}>
						{getArrayIconoLineas(lineas)}
					</View>
				</View>
				
				<View style={{width: "100%", padding: constants.bounds.padding*2}}>
					<View style={styles.mainInfoDiv}>
						{data.map((elem, index) => {

							if(elem.type == 'warning'){
								
								let warningImageId = 6;
								return(
									<View style={styles.inlineTrainInformation} key={index}> 
										<View style={{ flexDirection: 'row', gap: constants.bounds.padding, alignItems: 'center', justifyContent: 'center', width: "100%"}}>

											{getArrayIconoLineas([warningImageId], constants.icons.normalSize)}
											<Text style={styles.textStyles}>
												{elem.info.message}
											</Text>
										
										</View>
									</View>
								)
							}
							else if(elem.type == 'service'){ return(
								<View style={styles.inlineTrainInformation} key={index}> 

									<View style={{ flexDirection: 'row', gap: constants.bounds.padding, alignItems: 'center'}}>
										{getArrayIconoLineas([elem.info.line], constants.icons.normalSize)}
										<Text style={styles.textStyles}>
											{elem.info.destinationTitle}
										</Text>
									</View>
									<View>
										<Text style={styles.textStyles}>
											{elem.info.timeOfArrival}
										</Text>
									</View>
									
								</View>
							)}
						})}
					</View>
				</View>

			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	savedStationCard:{
		backgroundColor: colorsList.light.MAIN_WHITE,
		borderColor: colorsList.light.PRIMARY_BLUE,
		borderWidth: 2,
		padding: constants.bounds.padding,
		borderRadius: constants.bounds.radius,
		alignItems: "center",
		justifyContent: "flex-start",
		height: "auto",
	},
	lineasNombreDiv:{
		flexDirection: "column",
		flexWrap: 'wrap',
		gap: constants.bounds.padding,
		alignItems: "center",
		justifyContent: "center",
		
	},
	textStyles:{
		fontSize: constants.text.mainLabelSize,
	},
	mainInfoDiv:{
		width: "100%",
		height: "auto",
		flexDirection: "column",
		rowGap: constants.bounds.padding,
		alignItems: "center",
		justifyContent: "center",
		
	},
	inlineTrainInformation:{
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
})