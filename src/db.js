import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
    //API KEYS
    apiKey: "AIzaSyBhv6GYU5v-i4k-OzAg1Y8sSrLw3kXJHP8",
    authDomain: "chat-d4750.firebaseapp.com",
    projectId: "chat-d4750",
    storageBucket: "chat-d4750.appspot.com",
    messagingSenderId: "648265484630",
    appId: "1:648265484630:web:8f401bc2aeae4431002ef7",
    measurementId: "G-VXZ5870ZKR",
};

const db = firebase.initializeApp(config);
export default db
