// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
// import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTYFzSnDKy-EwgClqRNijjB7MGjUjUync",
  authDomain: "food-app-native-f3795.firebaseapp.com",
  projectId: "food-app-native-f3795",
  storageBucket: "food-app-native-f3795.appspot.com",
  messagingSenderId: "1054461502597",
  appId: "1:1054461502597:web:fbb31c04ac4a53d9f275ec",
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export default firebase;
