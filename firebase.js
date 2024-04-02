// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyYWuJfTND3XNUyeGbNkJwktW2uXSkUlQ",
  authDomain: "food-native-d3945.firebaseapp.com",
  projectId: "food-native-d3945",
  storageBucket: "food-native-d3945.appspot.com",
  messagingSenderId: "639233810020",
  appId: "1:639233810020:web:a9a444809d0ab0abdd0971",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
