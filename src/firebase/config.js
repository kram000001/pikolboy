import { initializeApp } from "firebase/app";

import {
  getFirestore
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyC9q1R4eQJcghLZVdgsdybTXMUx3SxskxY",

  authDomain: "pikolboy-scheduler.firebaseapp.com",

  projectId: "pikolboy-scheduler",

  storageBucket: "pikolboy-scheduler.firebasestorage.app",

  messagingSenderId: "177731896121",

  appId: "1:177731896121:web:e7e350f2a94c6be5ae5ee8"

};



const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);


export const auth = getAuth(app);


export const provider = new GoogleAuthProvider();