import { Link } from "expo-router";
import React from "react";
import { Button, Pressable, ScrollView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import { colorsList, constants } from "../constants/Colors";
import Card from '@/app/components/Card';

const [textOrigen, onChangeTextOrigen] = React.useState('')
const [textDestino, onChangeTextDestino] = React.useState('')


let estaciones = [
  {
    nombre: "zamora",
    lineas:[
      "L2a", "L2b", "L1"
    ]
  },
  {
    nombre: "san blas",
    lineas:[
      "L2e", "L2b", "L1"
    ]
  },
  {
    nombre: "zamora",
    lineas:[
      "Lx", "L2b", "L2a"
    ]
  },
]


export default function Index() {
	

  return (
    <ScrollView style={{
        backgroundColor: colorsList.light.FULL_WHITE
    }}>
        <View 
            style={{
                margin: 10,
                flexDirection: 'column',
                rowGap: 10,

                alignContent: "center",
                alignItems: "center",
        }}>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeTextOrigen}
                value={textOrigen}
                placeholder={"Origen..."}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeTextDestino}
                value={textDestino}
                placeholder="Destino..."
            />
            <Pressable style={styles.pressable}>
                <Text style={styles.text}>Buscar</Text>
            </Pressable>

            {
              estaciones.map((estacion) =>(
                <Card titulo={estacion.nombre} lineas={estacion.lineas}/>
              )) 
            }

			
      </View>
    </ScrollView>
  );
}

// const Hola = () => {
//     estaciones.forEach(titulo => {
//         return(
//             <View style={{width: "100%"}}>
//               <View style={styles.viewCard}>
//                 <Image
//                   source={require('@/assets/icons/L1_icon.png')}
//                   style={{width: 30, height: 30}}
//                 />
//                 <Image
//                   source={require('@/assets/icons/L2a_icon.png')}
//                   style={{width: 30, height: 30}}
//                   />
//                 <Image
//                   source={require('@/assets/icons/L2b_icon.png')}
//                   style={{width: 30, height: 30}}
//                 />
//               </View>
//               <Text>{titulo}</Text>
//             </View>
//         )
//     });
    
// }


const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderRadius: constants.bounds.radius,
    padding: constants.bounds.padding,
    backgroundColor: colorsList.light.MAIN_WHITE,
    borderColor: colorsList.light.PRIMARY_BLUE,
    fontSize: 24,
    color: colorsList.light.PRIMARY_BLUE,
    width: "100%"
  },
  pressable: {
    backgroundColor: colorsList.light.PRIMARY_BLUE,
    borderRadius: constants.bounds.radius,
    padding: constants.bounds.padding,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colorsList.light.MAIN_WHITE,
    fontSize: 24,
  },
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