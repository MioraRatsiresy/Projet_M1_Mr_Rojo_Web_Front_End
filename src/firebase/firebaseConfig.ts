import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
    apiKey: "AIzaSyB_eVGX7kuybqQrWZintYb3ZBNOlUZA6nI",
    authDomain: "mean-m1.firebaseapp.com",
    projectId: "mean-m1",
    storageBucket: "mean-m1.appspot.com",
    messagingSenderId: "296655919171",
    appId: "1:296655919171:web:0bc50408b9c55581739cf6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);