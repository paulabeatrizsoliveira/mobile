import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import Tabs from './tabs';
import Stack from './stack';



const  StackNavigator = createNativeStackNavigator();
const TabsNavigator = createBottomTabNavigator();


const Routes = () => {

    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {user?(
                <TabsNavigator.Navigator>
                    <TabsNavigator.Screen name='Tabs' component={Tabs}/>
                </TabsNavigator.Navigator>

            ) : (
                
                <StackNavigator.Navigator>
                <StackNavigator.Screen name='Stack' component={Stack}/>
            </StackNavigator.Navigator>

            )}
            
             {/* <Stack.Navigator>

                
                <Stack.Screen
                    name='Produtos'
                    component={Produtos}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='DetalheProduto'
                    component={DetalheProduto}
                    options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: '#38A69D',
                        },
                        headerTintColor: '#fff',
                        headerBackTitleVisible: false,
                        headerShadowVisible: false,

                    }}
                /> */}

                {/* {user ? (
                    <>
                        <Stack.Screen
                            name='Produtos'
                            component={Produtos}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='DetalheProduto'
                            component={DetalheProduto}
                            options={{
                                title: '',
                                headerStyle: {
                                    backgroundColor: '#38A69D',
                                },
                                headerTintColor: '#fff',
                                headerBackTitleVisible: false,
                                headerShadowVisible: false,

                            }}
                        />

                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name='Welcome'
                            component={Welcome}
                            options={{
                                headerShown: false
                            }}
                        />
                        
                        <Stack.Screen
                            name="SignIn"
                            component={SignIn}
                            options={{
                                title: '',
                                headerStyle: {
                                    backgroundColor: '#38A69D',
                                },
                                headerTintColor: '#fff',
                                headerBackTitleVisible: false,
                                headerShadowVisible: false,
                            }}
                        />
                    </>
                )

                } */}

            {/* </Stack.Navigator> */}
        </NavigationContainer >
    )
}

export default Routes;