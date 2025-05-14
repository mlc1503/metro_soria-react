import { useLocalSearchParams } from "expo-router"
import { useSQLiteContext } from "expo-sqlite";
import { Text } from "react-native";

export default function Index(){
    const {station_id} = useLocalSearchParams();
    const db = useSQLiteContext();
    
    
    return(
        <Text>{station_id}</Text>
    )
}