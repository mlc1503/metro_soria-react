import { Image, Pressable } from "react-native";
import { router } from "expo-router"

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
        sectionTitleSize: 30,
        mainTitleSize: 20,
        mainLabelSize: 16
    },
    icons:{
        normalSize: 28,
        plusSize: 32
    }
}

export const listaIconos = new Map([
    [1, require("@/assets/icons/L1_icon.webp")],
    [2, require("@/assets/icons/L1e_icon.webp")],
    // ["L2", require("@/assets/icons/L2_icon.webp")],
    [3, require("@/assets/icons/L2a_icon.webp")],
    [4, require("@/assets/icons/L2b_icon.webp")],
    [5, require("@/assets/icons/L2e_icon.webp")],
    [6, require("@/assets/icons/warning.png")],
])

export function getColorLinea(id:number):string{
    
    if([1,2].includes(id)) return colorsList.light.PRIMARY_CYAN
    return colorsList.light.PRIMARY_BLUE
}

export function getArrayIconoLineas(lineas: number[], size:number = constants.icons.plusSize){

    const image = (linea:number, index:number, size:number)=>{
        return(
            <Image
                key={`${linea}-${index}`}
                source={listaIconos.get(linea)}
                style={{width: size, height: size}}
            />
        )
    }


        return lineas.map((linea, index) =>{
            if(linea == 6){
                return image(linea, index, size)
            }
            else{
                return(
                    <Pressable onPress={()=>{
                        router.navigate({pathname: '/itinerary', params:{line_id: linea}})
                    }}>
                        {image(linea, index, size)}
                    </Pressable>
                )
            }
        })
}

export const IconoCTFV = <Image 
                            source={require('@/assets/icons/MetroSoriaLogoTinted.png')}
                            style={{
                                height: 50,
                                width: 50,
                                resizeMode: "contain"  
                        }}/>