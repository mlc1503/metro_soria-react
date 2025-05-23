import { Tabs } from "expo-router";
import React from "react";
import { colorsList, IconoCTFV } from "../constants/Constants";


export default function TabLayout(){ return(
    <Tabs screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: ()=> IconoCTFV,
        headerStyle: {
            backgroundColor: colorsList.light.PRIMARY_BLUE,
        },
        
        tabBarInactiveBackgroundColor: colorsList.light.PRIMARY_BLUE,
        tabBarInactiveTintColor: colorsList.light.FULL_WHITE,
        tabBarActiveBackgroundColor: colorsList.light.FULL_WHITE,
        tabBarActiveTintColor: colorsList.light.PRIMARY_BLUE
    }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Inicio',
                href: '/'
            }}
            />
        <Tabs.Screen
            name="lines"
            options={{
                title: 'Lineas',
                href: '/lines'
            }}
            />
        <Tabs.Screen
            name="stops"
            options={{
                title: 'Paradas',
                href: '/stops'
            }}
        />
    </Tabs>
)}