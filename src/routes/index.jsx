import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import Stack from './stack';
import Produtos from '../Screens/Produtos';
import Integrantes from '../Screens/Integrantes';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import DetalheProduto from '../Screens/DetalheProduto';

const StackNavigator = createNativeStackNavigator();
const TabsNavigator = createBottomTabNavigator();

const Routes = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>

            {user ? (
                <TabsNavigator.Navigator>
                    <TabsNavigator.Screen
                        name='Produtos'
                        component={Produtos}
                        options={{
                            title: '',
                            headerStyle: {
                                backgroundColor: '#38A69D',
                            },
                            headerShadowVisible: false,
                            tabBarLabel: "Produtos",
                            tabBarActiveTintColor: '#38A69D',
                            tabBarInactiveTintColor: '#c1c1c1',
                            tabBarIcon: ({ color, size }) => (
                                <Entypo name="app-store" size={size} color={color} />
                            ),
                            tabBarLabelStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            }
                        }}
                    />
                    <TabsNavigator.Screen
                        name='Integrantes'
                        component={Integrantes}
                        options={{
                            tabBarLabel: "Integrantes",
                            tabBarActiveTintColor: '#38A69D',
                            tabBarInactiveTintColor: '#c1c1c1',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="users" size={size} color={color} />
                            ),
                            tabBarLabelStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            }
                        }}
                    />
                    <TabsNavigator.Screen
                        name='DetalheProduto'
                        component={DetalheProduto}
                        options={{
                            tabBarButton: () => null,
                            title: '',
                            headerStyle: {
                                backgroundColor: '#38A69D',
                            },
                            headerShadowVisible: false,
                        }}
                    />
                </TabsNavigator.Navigator>

            ) : (
                <StackNavigator.Navigator>
                    <StackNavigator.Screen
                        name='Stack'
                        component={Stack}
                        options={{
                            headerShown: false
                        }}
                    />
                </StackNavigator.Navigator>
            )}
        </NavigationContainer>
    );
};

export default Routes;
