import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Produtos from "../Screens/Produtos";
import { Feather } from "@expo/vector-icons";
import Stack from "./stack";

const { Navigator, Screen } = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Navigator>
      <Screen
        name="Produtos"
        component={Stack}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="produtos" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Integrantes"
        component={Integrantes}
        options={{
          tabBarLabel: "Integrantes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="integrantes" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};