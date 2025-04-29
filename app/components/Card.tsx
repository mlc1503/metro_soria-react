import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants, listaIconos } from "../constants/Constants";

type StationDataItem = 
	{
		type: 'service'; 
		info: {
			line: string;
			timeOfArrival: string;
			destinationTitle: string;
		}; 
	} 
	| 
	{ type: 'warning'; info: {message: string;} };

interface CardProps{
	nombre: string;
	lineas: string[];
	data: StationDataItem[];
}

export default function Card({ nombre, lineas, data}: CardProps){

	const getArrayIconoLineas = (lineas: string[], size:number = 37)=>{

		return lineas.map((linea, index) =>(
			<Image
				key={`${linea}-${index}`}
				source={listaIconos.get(linea)}
				style={{width: size, height: size}}
			/>
		))
	}

	return (
		<View style={{width: "100%"}}>
			<View style={styles.savedStationCard}>

				<View style={styles.lineasNombreDiv}>
					<Text style={styles.textStyles}>{nombre}</Text>
					<View style={{flexDirection: 'row', columnGap: constants.bounds.padding}}>
						{getArrayIconoLineas(lineas)}
					</View>
				</View>
				
				<View style={{width: "100%", padding: constants.bounds.padding*2}}>
					<View style={styles.mainInfoDiv}>
						{data.map((elem, index) => {
							if(elem.type == 'warning'){
								return(
									<View style={styles.inlineTrainInformation} key={index}> 
										<View style={{ flexDirection: 'row', gap: constants.bounds.padding, alignItems: 'center', justifyContent: 'center', width: "100%"}}>

											{getArrayIconoLineas([elem.type], 30)}
											<Text style={{fontSize: 18}}>
												{elem.info.message}
											</Text>
										
										</View>
									</View>
								)
							}
							else if(elem.type == 'service'){
								return(
									<View style={styles.inlineTrainInformation} key={index}> 

										<View style={{ flexDirection: 'row', gap: constants.bounds.padding, alignItems: 'center'}}>
											{getArrayIconoLineas([elem.info.line], 30)}
											<Text style={{fontSize: 20}}>
												{elem.info.destinationTitle}
											</Text>
										</View>
										<View>
											<Text style={{fontSize: 20}}>
												{elem.info.timeOfArrival}
											</Text>
										</View>
										
									</View>
								)
							}
						})}
					</View>
				</View>

			</View>
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
		// width: "100%",
		flexDirection: "column",
		flexWrap: 'wrap',
		gap: constants.bounds.padding,
		alignItems: "center",
		justifyContent: "center",
		
	},
	textStyles:{
		fontSize: constants.text.mainTextSize,
		fontWeight: "semibold"
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