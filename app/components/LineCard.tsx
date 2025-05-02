import { Text, StyleSheet, View, Pressable } from "react-native"
import { colorsList, constants, getArrayIconoLineas, listaIconos } from "../constants/Constants"
import { router } from "expo-router"
interface LineDetails{
    nameId: string,
    origin:{
        id: number,
        name: string,
    }
    destination?:{
        id: number,
        name: string,
    }
}

export default function LineCard({nameId, origin, destination}:LineDetails){


    if(destination == undefined) destination = {id: 0, name: '(Circular)'}
    
    return(

        <Pressable onPress={()=>{
            router.navigate({pathname: '/itinerarios', params: {origin: origin.id, destination: destination.id}})
        }}>

            <View style={styles.lineCard}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: constants.bounds.padding*2,
                    // columnGap: constants.bounds.padding*3,
                }}>
                    {getArrayIconoLineas([nameId], 50)}
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                        <View>
                            <Text style={styles.textStyles}>{origin.name}</Text>
                            <Text style={styles.textStyles}>{destination.name}</Text>
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