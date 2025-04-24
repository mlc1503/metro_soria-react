import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants } from "../constants/Constants";



export default function Card({ nombre, lineas, data}: { nombre:string, lineas:Array<string>, data?:any[] }){


	let listaIconos: any[] = []; 
	lineas.forEach(linea => {
		switch (linea) {
			case "L1":
				listaIconos.push(require("@/assets/icons/L1_icon.webp"))
				break;

			case "L1e":
				listaIconos.push(require("@/assets/icons/L1e_icon.webp"))
				break;

			case "L2":
				listaIconos.push(require("@/assets/icons/L2_icon.webp"))
				break;

			case "L2a":
				listaIconos.push(require("@/assets/icons/L2a_icon.webp"))
				break;

			case "L2b":
				listaIconos.push(require("@/assets/icons/L2b_icon.webp"))
				break;
			case "L2e":
				listaIconos.push(require("@/assets/icons/L2e_icon.webp"))
				break;
					
			default:
				break;
		} 
	});


	return (
		<View style={{width: "100%"}}>
			<View style={styles.savedStationCard}>
				<View style={styles.lineasNombreDiv}>
					{
						listaIconos.map((iconPath) =>(
							<Image
							source={iconPath}
							style={{width: 30, height: 30}}
							/>
						))
					}
					<Text style={styles.textStyles}>{nombre}</Text>

				</View>
				<View style={{width: "100%", padding: constants.bounds.padding*2}}>
					<View style={styles.mainInfoDiv}>
						{data?.map((datum) =>(
							<Text>{datum}</Text>
						))}
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
		width: "100%",
		flexDirection: "row",
		columnGap: constants.bounds.padding,
		alignItems: "center",
		justifyContent: "flex-start",
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
		backgroundColor: "red"
	}
})