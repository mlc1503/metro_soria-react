import { Image } from "react-native";

export const colorsList = {
    light: {
        PRIMARY_BLUE : '#214478',
        PRIMARY_CYAN : '#0097A7',
        SECONDARY_CYAN : '#70CCD5',
        SLIGHT_BLUE : '#C2F5FA',
        MAIN_WHITE: '#EEF5FC',
        MAIN_BLACK: '#1A1A1A',
        ALERT_RED: '#A71000',
        TEST_COLOR : "#72B465",
        FULL_WHITE: "#FFFFFF",
    },  
}

export const constants = {
    bounds:{
        radius: 10,
        padding: 10,
    },
    text:{
        mainTitleSize: 20,
        mainLabelSize: 16
    },
    icons:{
        normalSize: 28,
        plusSize: 32
    }
}

export const listaIconos = new Map([
    ["L1", require("@/assets/icons/L1_icon.webp")],
    ["L1e", require("@/assets/icons/L1e_icon.webp")],
    // ["L2", require("@/assets/icons/L2_icon.webp")],
    ["L2a", require("@/assets/icons/L2a_icon.webp")],
    ["L2b", require("@/assets/icons/L2b_icon.webp")],
    ["L2e", require("@/assets/icons/L2e_icon.webp")],
    ["warning", require("@/assets/icons/warning.png")],
])

export function getArrayIconoLineas(lineas: string[], size:number = constants.icons.plusSize){
        return lineas.map((linea, index) =>(
            <Image
                key={`${linea}-${index}`}
                source={listaIconos.get(linea)}
                style={{width: size, height: size}}
            />
        ))
}


export const IconoCTFV = <Image 
                            source={require('@/assets/icons/MetroSoriaLogoTinted.png')}
                            style={{
                                height: 50,
                                width: 50,
                                resizeMode: "contain"  
                        }}/>