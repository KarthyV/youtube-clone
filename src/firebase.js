import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuC1xi-z7uLom67I6oCQeWVWLf3o2prYE",
  authDomain: "clone-4d027.firebaseapp.com",
  projectId: "clone-4d027",
  storageBucket: "clone-4d027.appspot.com",
  messagingSenderId: "571429248690",
  appId: "1:571429248690:web:68e9cad5916f70857d73ab",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
export default getFirestore();
