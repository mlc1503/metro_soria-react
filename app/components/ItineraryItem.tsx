import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants, getArrayIconoLineas, } from "../constants/Constants";

interface ItineraryStation {
	station_id: number;
	name:string;
	correspondences:number[];
	item_type: 'start' | 'end' | null
	line_id: number
}

const ItineraryItem = (data :ItineraryStation)=> {

	let icon_imageSource;
	let icon_size = 110;
	
	switch (data.item_type) {
		case 'start':
			icon_imageSource = require('@/assets/icons/SVGLineStart.png')
			icon_size = 80
			break;
			
		case 'end':
			icon_imageSource = require('@/assets/icons/SVGLineEnd.png')
			icon_size = 80
			break;
		
		default:
			icon_imageSource = require('@/assets/icons/SVGLineaContinue.png')
			break;
	}
	

	const iconImage = (item_type: 'start' | 'end' | null)=>{

		let icon_imageSource;
		let icon_size = 110;
		
		switch (item_type) {
			case 'start':
				icon_imageSource = require('@/assets/icons/SVGLineStart.png')
				icon_size = 80
				break;
				
			case 'end':
				icon_imageSource = require('@/assets/icons/SVGLineEnd.png')
				icon_size = 80
				break;
			
			default:
				icon_imageSource = require('@/assets/icons/SVGLineaContinue.png')
				break;
		}

		if(item_type == 'end'){
			return(
				<View style={{
					flexDirection: "column",
					height: 110,
				}}>
					<Image 
						source={icon_imageSource}
						//TODO FALTA AÑADIR COLOR LINEA
						resizeMode='contain'
						style={{
							height: icon_size,
							width: 50,
						}}
					/>
				</View>
			)
		}

		return(
			<View style={{
				flexDirection: "column-reverse",
				height: 110,
			}}>
				<Image 
					source={icon_imageSource}
					tintColor={colorsList.light.PRIMARY_BLUE}
					resizeMode='contain'
					style={{
						height: icon_size,
						width: 50,
					}}
				/>
			</View>
		)
		
	}

	return(
		<View style={styles.container}>
			<View style={styles.first_elem}>

				{iconImage(data.item_type)}
				
				<View style={{flexDirection: 'row', flex: 1}}>
					<Text style={styles.text}>{data.name}</Text>
				</View>

			</View>

			<View style={styles.second_elem}>
				{getArrayIconoLineas(data.correspondences)}
			</View>

		</View>
    )
}


const styles = StyleSheet.create({
	container:{
		height: 110,
			
		flexDirection: 'row',
		justifyContent: "space-between",

		alignItems: "center",
		
		paddingLeft: constants.bounds.padding,
		paddingRight: constants.bounds.padding,
		columnGap: constants.bounds.padding,
	},
	first_elem: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		columnGap: constants.bounds.padding,
	},
	second_elem:{
		flexDirection: "row-reverse",
		columnGap: constants.bounds.padding
	},
	text:{
		fontSize: constants.text.mainLabelSize,
		fontWeight: 'medium',
		textAlign: 'center'
	}
})

export default ItineraryItem;
