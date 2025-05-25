import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Image } from "react-native";
import { colorsList, IconoCTFV } from "../constants/Constants";


export default function TabLayout(){ 
    const [color, setColor] = useState(); 
    return(
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
        tabBarActiveTintColor: colorsList.light.PRIMARY_BLUE,
    }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Inicio',
                href: '/',
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require('@/assets/icons/home.png')}
                        style={{
                            height: 25,
                            width: 30,
                            resizeMode: "contain",
                            tintColor: focused ? colorsList.light.PRIMARY_BLUE : colorsList.light.FULL_WHITE
                    }}/>
                )
            }}
            
            />
        <Tabs.Screen
            name="lines"
            options={{
                title: 'Líneas',
                href: '/lines',
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require('@/assets/icons/lines.png')}
                        style={{
                            height: 30,
                            width: 30,
                            resizeMode: "contain",
                            tintColor: focused ? colorsList.light.PRIMARY_BLUE : colorsList.light.FULL_WHITE
                    }}/>
                )
            }}
            />
        <Tabs.Screen
            name="stops"
            options={{
                title: 'Paradas',
                href: '/stops',
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require('@/assets/icons/stops.png')}
                        style={{
                            height: 30,
                            width: 30,
                            resizeMode: "contain",
                            tintColor: focused ? colorsList.light.PRIMARY_BLUE : colorsList.light.FULL_WHITE
                    }}/>
                )
            }}
        />
        <Tabs.Screen
            name="users"
            options={{
                title: 'Tú',
                href: '/users',
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require('@/assets/icons/user.png')}
                        style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            tintColor: focused ? colorsList.light.PRIMARY_BLUE : colorsList.light.FULL_WHITE
                    }}/>
                )
            }}
        />
    </Tabs>
)}