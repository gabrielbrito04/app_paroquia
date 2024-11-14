import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cadastro from '/home/gabriel/Documentos/app_paroquia/src/pages/Cadastro/index.js';
import Pesquisar from '/home/gabriel/Documentos/app_paroquia/src/pages/Pesquisar/index.js';

import { Entypo, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs (){
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#031A35',
                    borderColor: 'transparent',
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: '#FFFFFF',
            }}
        >
            <Tab.Screen 
                name='Cadastro' 
                component={Cadastro}
                options={{
                    style: {
                        paddingBottom: 5,
                    },
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='plus' size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='Visualisar' 
                component={Pesquisar}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name='search' size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}