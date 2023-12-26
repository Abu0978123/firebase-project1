import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCknxxGCXFkWxbJM1Kh41S7ZzzCVLu44zQ",
  authDomain: "project1-7673b.firebaseapp.com",
  projectId: "project1-7673b",
  storageBucket: "project1-7673b.appspot.com",
  messagingSenderId: "407287986215",
  appId: "1:407287986215:web:9678f718fd9bcf13f07602",
  measurementId: "G-EJQ4EBKV07"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app);