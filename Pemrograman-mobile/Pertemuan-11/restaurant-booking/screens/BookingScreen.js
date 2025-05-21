import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  Alert,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BookingScreen({ navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [guests, setGuests] = useState(1); // Initialize as a number
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleBooking = async () => {
    if (!name || !guests || !date || !time) {
      Alert.alert("Please fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, "bookings"), {
        name,
        guests: parseInt(guests),
        date: formatDate(date),
        time: formatTime(time),
      });
      Alert.alert("Booking successful");
      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Error booking", error.message);
    }
  };
  const increamentGuests = () => {
    if (guests < 10) {
      setGuests((prev) => prev + 1); // Increment as a number
    } else {
      Alert.alert("Max guests is 10");
    }
  };
  const decreamentGuests = () => {
    if (guests > 1) {
      setGuests((prev) => prev - 1); // Decrement as a number
    } else {
      Alert.alert("Min guests is 1");
    }
  };
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Book a Table</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded w-80 mb-4`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Text style={tw`border border-gray-300 p-2 rounded w-80 mb-4`}>
          {formatDate(date)}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Pressable onPress={() => setShowTimePicker(true)}>
        <Text style={tw`border border-gray-300 p-2 rounded w-80 mb-4`}>
          {formatTime(time)}
        </Text>
      </Pressable>

      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity
          style={tw`bg-red-500 p-2 rounded mr-2`}
          onPress={decreamentGuests}
        >
          <Text style={tw`text-white text-lg`}>-</Text>
        </TouchableOpacity>
        <Text style={tw`text-lg`}>{guests}</Text>
        <TouchableOpacity
          style={tw`bg-green-500 p-2 rounded ml-2`}
          onPress={increamentGuests}
        >
          <Text style={tw`text-white text-lg`}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded`}
        onPress={handleBooking}
      >
        <Text style={tw`text-white text-lg`}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}
