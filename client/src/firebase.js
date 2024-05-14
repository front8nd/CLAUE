import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCCSha6RhUk1eufV99WGy_2MHH7xVoqBgY",
  authDomain: "ecommerce-cde88.firebaseapp.com",
  databaseURL: "https://ecommerce-cde88-default-rtdb.firebaseio.com",
  projectId: "ecommerce-cde88",
  storageBucket: "ecommerce-cde88.appspot.com",
  messagingSenderId: "190386283497",
  appId: "1:190386283497:web:1deba37f25751147c82178",
  measurementId: "G-6BP2JXD06L",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth();

export default firebaseConfig;
