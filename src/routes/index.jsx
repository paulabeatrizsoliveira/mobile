import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes