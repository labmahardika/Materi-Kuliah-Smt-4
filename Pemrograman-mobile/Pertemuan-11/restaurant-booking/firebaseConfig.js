import { initilizeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8pTin9vaNJsE_bKtu2wJYK09e3xaEPMg",
  authDomain: "restaurant-booking-7a0d5.firebaseapp.com",
  projectId: "restaurant-booking-7a0d5",
  storageBucket: "restaurant-booking-7a0d5.firebasestorage.googleapis.com",
  messagingSenderId: "613331476957",
  appId: "1:613331476957:android:2796ea702208180e949634",
};
// Initialize Firebase
const app = initilizeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
