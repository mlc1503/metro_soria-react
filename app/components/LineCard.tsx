import { Text, StyleSheet, View, Pressable } from "react-native"
import { colorsList, constants, getArrayIconoLineas } from "../constants/Constants"
import { router } from "expo-router"
interface LineDetails{
    id: number,
    origin_stop_name: string,
    destination_stop_name: string
}

export default function LineCard({id, origin_stop_name, destination_stop_name}:LineDetails){


        
    if(destination_stop_name == null) destination_stop_name = '(Circular)' 
    
    return(
        <Pressable onPress={()=>{
            router.navigate({pathname: '/itinerary', params: {line_id: id}})
        }}>

            <View style={styles.lineCard}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: constants.bounds.padding*2,
                    // columnGap: constants.bounds.padding*3,
                }}>

                    {getArrayIconoLineas([id], 50)}
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                        <View>
                            <Text style={styles.textStyles}>{origin_stop_name}</Text>
                            <Text style={styles.textStyles}>{destination_stop_name}</Text>
                        </View>
                    </View>
                    
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    lineCard:{
        backgroundColor: colorsList.light.MAIN_WHITE,
        borderColor: colorsList.light.PRIMARY_BLUE,
        borderWidth: 2,
        padding: constants.bounds.padding,
        borderRadius: constants.bounds.radius,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "auto",
        width: "100%"
    },
    textStyles:{
        fontSize: constants.text.mainTitleSize,
        fontWeight: "500",
        textAlign: "center"
    }
})