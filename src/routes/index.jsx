import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import Tabs from './tabs';
import Stack from './stack';

const StackNavigator = createNativeStackNavigator();
const TabsNavigator = createBottomTabNavigator();

const Routes = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {user ? (
                <TabsNavigator.Navigator>
                    <TabsNavigator.Screen
                    name='Tabs'
                    component={Tabs}
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
