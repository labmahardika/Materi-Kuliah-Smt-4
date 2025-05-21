import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function HomeScreen({ navigation }) {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>
        Welcome to Restaurant Booking
      </Text>
      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded`}
        onPress={() => navigation.navigate("BookingScreen")}
      >
        <Text style={tw`text-white text-lg`}>Make a Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-green-500 p-4 rounded mt-4`}
        onPress={() => navigation.navigate("BookingListScreen")}
      >
        <Text style={tw`text-white text-lg`}>View Booking</Text>
      </TouchableOpacity>
    </View>
  );
}
