import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import BookingListScreen from "./screens/BookingListScreen"; // Ensure this file exists and is implemented

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ title: "Booking" }}
        />
        <Stack.Screen
          name="BookingListScreen"
          component={BookingListScreen}
          options={{ title: "Booking List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
