import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

const Stack = () => {
  return (
    <Navigator>
      <Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }} />

      <Screen
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
    </Navigator>
  );
};

export default Stack;
