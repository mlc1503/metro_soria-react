import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants, listaIconos } from "../constants/Constants";

class StationInfo {
	type:string;
	info: { 
		line: string; 
		timeOfArrival:string, 
		destinationTitle:string, 
		message:string
	};

	public constructor(type:string, info: { line: string; timeOfArrival:string, destinationTitle:string, message:string}){
		this.type = type;
		this.info = info;
	}
}

export default function Card({ nombre, lineas, data}: { nombre:string, lineas:Array<string>, data:Array< {type: string, info: { line:string, timeOfArrival:string, destinationTitle:string, message:string } } >}){
	
	let infoStationArray:Array<StationInfo> = [];
	data.forEach(element => {
		infoStationArray.push(new StationInfo(element.type, element.info))
	});


	const getArrayIconoLineas = (lineas: string[], size?:number)=>{

		if(size == null) size = 37

		return lineas.map((linea) =>(
			<Image
				source={listaIconos.get(linea)}
				style={{width: size, height: size}}
			/>
		))
	}

	const getInlineTrainInformation = (data:[{}]) =>{
		
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
						{/* {infoStationArray.map((elem, index) => (
							<View style={styles.inlineTrainInformation} key={index}>

								<View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
									{getArrayIconoLineas(new Array(elem.info.line), 30)}
									<Text>{elem.info.destinationTitle}</Text>
								</View>
								<View>
									<Text>{elem.info.timeOfArrival}</Text>
								</View>

							</View>
						))} */}
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
		height: "auto"
	},
	lineasNombreDiv:{
		width: "80%",
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
		justifyContent: 'center',
		alignItems: 'center',
	}
})