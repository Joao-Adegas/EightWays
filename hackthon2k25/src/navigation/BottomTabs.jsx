import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatBotScreen from '../app/screens/ChatBot';
import Forms from '../app/screens/Forms';
import ListaObjetivosUsuario from '../app/screens/ListaObjetivosUsuario';
import ObjetivosScreen from '../app/screens/ObjetivosScreen';
import StatusNutricao from '../app/screens/StatusNutricao';
import TelaInicial from '../app/screens/TelaInicial';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ headerShown: false }} />
            <Stack.Screen name="StatusNutricao" component={StatusNutricao} />
            <Stack.Screen name="Forms" component={Forms} />
        </Stack.Navigator>
    );
}

const BottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Objetivos de Hoje') {
                            iconName = focused ? 'checkbox' : 'checkbox-outline';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Sugestões') {
                            iconName = focused ? 'lightbulb' : 'lightbulb-outline';
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'ChatBot') {
                            iconName = focused ? 'robot' : 'robot-outline';
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        }
                    },
                    tabBarActiveTintColor: '#4CAF50', 
                    tabBarInactiveTintColor: 'gray', 
                })}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeStack} 
                    options={{ headerShown: false }} 
                />
                <Tab.Screen  
                    name="Objetivos de Hoje" 
                    component={ListaObjetivosUsuario}  
                />
                <Tab.Screen 
                    name="Sugestões" 
                    component={ObjetivosScreen}  
                />
                <Tab.Screen 
                    name="ChatBot" 
                    component={ChatBotScreen} 
                    options={{ title: 'Lumin 🤖' }} // Personaliza o título
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabs;