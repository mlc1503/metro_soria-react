import { Text, View, Image, StyleSheet } from 'react-native'
import { colorsList, constants } from "../constants/Colors";

export default function Card({ titulo }: { titulo: string}){

    return (
        <View style={{width: "100%"}}>
            <View style={styles.viewCard}>
            <Image
                source={require('@/assets/icons/L1_icon.png')}
                style={{width: 30, height: 30}}
            />
            <Image
                source={require('@/assets/icons/L2a_icon.png')}
                style={{width: 30, height: 30}}
                />
            <Image
                source={require('@/assets/icons/L2b_icon.png')}
                style={{width: 30, height: 30}}
            />
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