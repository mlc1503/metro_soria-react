import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants, listaIconos, getArrayIconoLineas } from "../constants/Constants";

interface ItineraryStation {
	station_id: number;
	name:string;
	correspondences:number[];

	// public constructor(station_id:number, name:string, correspondences:number[]) {
	// 	this.station_id = station_id,
	// 	this.name = name,
	// 	this.correspondences = correspondences;
	// }
}

const ItineraryItem = (data :ItineraryStation)=> {
    return(
        <View>
            
        </View>
    )
}


export default ItineraryItem;
