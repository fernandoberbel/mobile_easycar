import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/home";
import Passenger from "./screens/passenger";
import Driver from "./screens/driver";
import Ride from "./screens/ride";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="passenger"
          component={Passenger}
          options={{
            // headerShown: false,
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="driver"
          component={Driver}
          options={{
            // headerShown: false,
            headerTitle: "Viagens Disponíveis",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ride"
          component={Ride}
          options={{
            // headerShown: false,
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
