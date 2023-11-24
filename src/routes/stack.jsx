import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import SignIn from "../Screens/SignIn";
import Welcome from "../Screens/Welcome";

const { Navigator, Screen } = createNativeStackNavigator();

const Stack = () => {
  return (
    <Navigator>
      <Screen name="Welcome" 
      component={Welcome}
      options={{ headerShown: false }} />
      
      <Screen name="Signin"
       component={SignIn} />
    </Navigator>
  );
};

export default Stack;
