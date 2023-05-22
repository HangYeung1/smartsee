import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import companies from "./companies.json" assert { type: "json" };

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNTcV3NnoqBwBBQrqR3yFZPTFMDtjiQrg",
  authDomain: "smartsee-2417f.firebaseapp.com",
  projectId: "smartsee-2417f",
  storageBucket: "smartsee-2417f.appspot.com",
  messagingSenderId: "887708427545",
  appId: "1:887708427545:web:cf1c6e7eb7905f858d1188",
};

// Create bindings object
let bindings = {};
companies.forEach((company) => {
  company.binding.forEach((binding) => {
    bindings[binding] = company.name;
  });
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload all companies to firestore
const uploadCompanies = async (companies) => {
  companies.forEach((company) => {
    const uploadCompany = async (company) => {
      try {
        const collectionRef = collection(db, "companies");
        await addDoc(collectionRef, company);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    uploadCompany(company);
  });
};

uploadCompanies(companies);
