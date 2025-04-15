import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView style={{
      margin: 10,
      borderColor: '#000000',
      borderWidth: 2
    }}>
      <Text>
        holaIndex
      </Text>
    </ScrollView>
  );
}
