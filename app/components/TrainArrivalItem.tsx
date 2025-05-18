import { View, Text, StyleSheet } from "react-native";
import { constants, getArrayIconoLineas, colorsList } from "../constants/Constants";


interface LineArrivals {
    line_id:number,
    arrivals:{
        direction_stop_name:string,
        arrivals:number[]
    }
}


// export default function Index(data:LineArrivals | null) {
export default function Index() {
    return(
        <View style={arrivalStyles.container}>
                    
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: constants.bounds.padding,
            }}>
                {getArrayIconoLineas([2])}
                <Text style={arrivalStyles.lineItinerary_labelText}>
                    Estación de Soria - Las Camaretas
                </Text>
            </View>
            
            <View style={{
                width: "100%",
                padding: constants.bounds.padding,
            }}>
                <View style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap:constants.bounds.padding,
                }}>
            
                    {/* START FOREACH */}
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            columnGap: constants.bounds.padding
                        }}>
                            {getArrayIconoLineas([2], 25)}
                            <Text>Estación de Soria</Text>
                        </View>
            
                        <Text> 38, 57 min</Text>
                    </View>
                    
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            columnGap: constants.bounds.padding
                        }}>
                            {getArrayIconoLineas([2], 25)}
                            <Text>Las Camaretas</Text>
                        </View>
            
                        <Text> 38, 57 min</Text>
                    </View>
                    
                </View>
                {/* END FOREACH */}

            </View>
            
        </View>
    )
}

const arrivalStyles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colorsList.light.MAIN_WHITE,
        borderColor: colorsList.light.PRIMARY_BLUE,
        borderWidth: 2,
        borderRadius: constants.bounds.radius,
        padding: constants.bounds.padding
    },
    lineItinerary_labelText: {
        fontSize: constants.text.mainLabelSize,
        fontWeight: "bold"
    }
})