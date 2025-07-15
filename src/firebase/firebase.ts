// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvmejJCcV9OqKAqbJOtZZYp870NiUlvsQ",
  authDomain: "movie-2c7b8.firebaseapp.com",
  projectId: "movie-2c7b8",
  storageBucket: "movie-2c7b8.appspot.com", // ✅ to‘g‘risi: appspot.com
  messagingSenderId: "470592246376",
  appId: "1:470592246376:web:93fccec58cad23be5461dd",
  measurementId: "G-20W79549Q7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
