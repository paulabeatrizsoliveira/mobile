import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';
import DetalheProduto from '../Screens/DetalheProduto';
import Produtos from '../Screens/Produtos';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Routes = () => {

    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>

                {user ? (
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

                }

            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes