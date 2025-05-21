import React, { use } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import tw from "twrnc";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function BookingListScreen() {
  const [bookings, setBookings] = React.useState([]);
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const q = query(collection(db, "bookings"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push({ id: doc.id, ...doc.data() });
      });
      setBookings(bookingsList);
    } catch (error) {
      console.error("Error fetching bookings: ", error);
    }
  };

  const renderBookingItem = ({ item }) => {
    <View style={tw`p-4 border-b border-gray-200`}>
      <Text style={tw`text-lg font-bold`}>{item.name}</Text>
      <Text style={tw`text-gray-600`}>
        {item.guests} guests on {item.date} at {item.time}
      </Text>
    </View>;
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
      />
    </View>
  );
}
