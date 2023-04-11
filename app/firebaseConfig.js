import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNTcV3NnoqBwBBQrqR3yFZPTFMDtjiQrg",
  authDomain: "smartsee-2417f.firebaseapp.com",
  projectId: "smartsee-2417f",
  storageBucket: "smartsee-2417f.appspot.com",
  messagingSenderId: "887708427545",
  appId: "1:887708427545:web:cf1c6e7eb7905f858d1188",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
