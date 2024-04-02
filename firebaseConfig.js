import { initializeApp } from "firebase/app";

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'


// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

const firebaseConfig = {
  apiKey: "AIzaSyBrQ4j977bl9iPSuZ0VEL6fPTd4SxqQrRU",
  authDomain: "userchat-d3fcd.firebaseapp.com",
  projectId: "userchat-d3fcd",
  storageBucket: "userchat-d3fcd.appspot.com",
  messagingSenderId: "747852146185",
  appId: "1:747852146185:web:b1d40c36964c8245253ad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
