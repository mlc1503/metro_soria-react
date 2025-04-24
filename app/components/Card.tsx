import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants } from "../constants/Colors";



export default function Card({ titulo, lineas}: { titulo: string, lineas: Array<string>}){


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
				<View style={styles.viewCard}>
				{
					listaIconos.map((iconPath) =>(
						<Image
							source={iconPath}
							style={{width: 30, height: 30}}
						/>
					))
				}
				<Text>{titulo}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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