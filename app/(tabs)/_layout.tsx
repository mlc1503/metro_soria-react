import { Tabs } from "expo-router";
import React from "react";


export default function TabLayout(){
    return(
    <Tabs
        screenOptions={{
            headerShown: false,
        }}>
        <Tabs.Screen
            name="lineas"
            options={{
            title: 'Lineas',
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
            title: 'index',
            href: null
            }}
        />
        <Tabs.Screen
            name="paradas"
            options={{
            title: 'Paradas',
            }}
        />
    </Tabs>
    )
}