import { Link } from "expo-router";
import React from "react";
import { Button, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { colorsList } from "../constants/Colors";

export default function Index() {

  const [textOrigen, onChangeTextOrigen] = React.useState('')
  const [textDestino, onChangeTextDestino] = React.useState('')

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
                // borderColor: '#000000',
                // borderWidth: 2,
        }}>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeTextOrigen}
                value={textOrigen}
                placeholder={"Origen..."}
            />
            <TextInput
                style={styles.textInput}
                // style={StyleSheet.compose(styles.textInput, styles.text)}
                onChangeText={onChangeTextDestino}
                value={textDestino}
                placeholder="Destino..."
            />
            <Pressable style={styles.pressable}>
                <Text style={styles.text}>Buscar</Text>
            </Pressable>

            <View>
                {/* <Card>

                </Card> */}
            </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colorsList.light.MAIN_WHITE,
    borderColor: colorsList.light.PRIMARY_BLUE,
    fontSize: 24,
    color: colorsList.light.PRIMARY_BLUE,
    width: "100%"
  },
  pressable: {
    backgroundColor: colorsList.light.PRIMARY_BLUE,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colorsList.light.MAIN_WHITE,
    fontSize: 24,
  }
})