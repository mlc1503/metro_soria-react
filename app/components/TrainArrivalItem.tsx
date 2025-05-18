import { View, Text, StyleSheet } from "react-native";
import { constants, getArrayIconoLineas, colorsList } from "../constants/Constants";
import { useEffect, useState } from "react";


interface LineArrivals {
    line_id: number;
    title_name: string
    arrivals: {
        direction_stop_name: string;
        time_to_selectedStation: number,
        departure_minutes: number[]
    }[]
}

export default function Index(data: LineArrivals) {

    console.log(JSON.stringify(data), '\n');

    const [date, setDate] = useState(new Date())  
    let current_time = date.getHours()*60 + date.getMinutes()

    useEffect(()=>{
        const interval = setInterval(() => {
            setDate(new Date())
        }, 30000);

        return () =>clearInterval(interval)
    }, [])

    function differences(times:number[], time_to_selectedStation:number) {
        let label = ""
        
        times.forEach((time, index) => {
            
            let minutes_to_train = time + time_to_selectedStation - current_time

            if(index == times.length - 1){
                label += minutes_to_train + ' min'

            }
            else{
                label += minutes_to_train + ', '
            }
            
        });
        console.log(label);
        
        return label
    };

    return (
        <View style={arrivalStyles.container}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: constants.bounds.padding,
            }}>
                {getArrayIconoLineas([data.line_id])}
                <Text style={arrivalStyles.lineItinerary_labelText}>{data.title_name}</Text>
            </View>

            <View style={{
                width: "100%",
                padding: constants.bounds.padding,
            }}>
                <View style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: constants.bounds.padding,
                }}>
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
                            {getArrayIconoLineas([data.line_id], 25)}
                            <Text>{data.arrivals[0].direction_stop_name}</Text>
                        </View>
            
                        <Text>{differences(data.arrivals[0].departure_minutes, data.arrivals[0].time_to_selectedStation)}</Text>
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
                            {getArrayIconoLineas([data.line_id], 25)}
                            <Text>{data.arrivals[1].direction_stop_name}</Text>
                        </View>
            
                        <Text>{differences(data.arrivals[1].departure_minutes, data.arrivals[1].time_to_selectedStation)}</Text>
                    </View>
                    
                </View>

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
