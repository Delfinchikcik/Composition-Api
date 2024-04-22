
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzWgNsUKrrrxS8o7c_ozu53NoiX09fLEU",
  authDomain: "compositionapi-ec1de.firebaseapp.com",
  projectId: "compositionapi-ec1de",
  storageBucket: "compositionapi-ec1de.appspot.com",
  messagingSenderId: "141138422118",
  appId: "1:141138422118:web:ecffc22541e9c44a3300a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{
    db
}