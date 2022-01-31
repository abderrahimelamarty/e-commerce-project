// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyC6At5-Kv4UqEq3pioIJiPfcuiJqWLpIQQ",
    authDomain: "e-commerce-project-5cc83.firebaseapp.com",
    projectId: "e-commerce-project-5cc83",
    storageBucket: "e-commerce-project-5cc83.appspot.com",
    messagingSenderId: "607672916938",
    appId: "1:607672916938:web:cef3fe2f280459d5134d33",
    measurementId: "G-6LWWP0FDX9"
  };
 // Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const fs = firebaseApp.firestore();
const auth = firebase.auth();
const storage=firebase.storage();

export { auth, fs,storage};
