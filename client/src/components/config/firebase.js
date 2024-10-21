import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvL8X0Qf36lP_ggK2a051YKQmJU4-l8tQ",
  authDomain: "bossfinderai.firebaseapp.com",
  projectId: "bossfinderai",
  storageBucket: "bossfinderai.appspot.com",
  messagingSenderId: "181972476224",
  appId: "1:181972476224:web:eed5d06e2810ed88c21aa5",
  measurementId: "G-F16LENQ3CV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

export default app;
