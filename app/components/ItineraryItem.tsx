import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { constants, getArrayIconoLineas, getColorLinea, } from "../constants/Constants";
import { router } from 'expo-router';

interface ItineraryStation {
	station_id: number;
	name:string;
	correspondences:number[];
	item_type: 'start' | 'end' | null
	line_id: number
}

const ItineraryItem = (data :ItineraryStation)=> {

	const iconImage = (item_type: 'start' | 'end' | null)=>{

		let icon_imageSource;
		let icon_size = 110;
		
		if([2,5].includes(data.line_id)){
			switch (item_type) {
				case 'start':
					icon_imageSource = require('@/assets/icons/SVGLineHollowStart.png')
					icon_size = 80
					break;
					
				case 'end':
					icon_imageSource = require('@/assets/icons/SVGLineHollowEnd.png')
					icon_size = 80
					break;
				
				default:
					icon_imageSource = require('@/assets/icons/SVGLineHollowContinue.png')
					break;
			}
		}
		else{
			switch (item_type) {
				case 'start':
					icon_imageSource = require('@/assets/icons/SVGLineFilledStart.png')
					icon_size = 80
					break;
					
				case 'end':
					icon_imageSource = require('@/assets/icons/SVGLineFilledEnd.png')
					icon_size = 80
					break;
				
				default:
					icon_imageSource = require('@/assets/icons/SVGLineFilledContinue.png')
					break;
			}
		}
		

		if(item_type == 'end'){
			return(
				<View style={{
					flexDirection: "column",
					height: 110,
				}}>
					<Image 
						source={icon_imageSource}
						tintColor={getColorLinea(data.line_id)}
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
					tintColor={getColorLinea(data.line_id)}
					resizeMode='contain'
					style={{
						height: icon_size,
						width: 50,
					}}
				/>
			</View>
		)
		
	}

	// console.log("DATA STATION",data.station_id);
	

	return(
		<Pressable style={styles.container} 
			onPress={()=>{
				router.navigate({pathname: '/stopViewer' , params: {stop_id: data.station_id}})
			}}>
			<View style={styles.first_elem}>

				{iconImage(data.item_type)}
				
				<View style={{flexDirection: 'row', flex: 1}}>
					<Text style={styles.text}>{data.name}</Text>
				</View>

			</View>

			<View style={styles.second_elem}>
				{getArrayIconoLineas(data.correspondences)}
			</View>

		</Pressable>
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
