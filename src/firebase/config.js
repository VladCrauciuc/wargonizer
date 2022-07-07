import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCopuQwgtcafDl8EpLCxzoh59kUd9bTuFw",
  authDomain: "the-wargonizer.firebaseapp.com",
  projectId: "the-wargonizer",
  storageBucket: "the-wargonizer.appspot.com",
  messagingSenderId: "1057954190744",
  appId: "1:1057954190744:web:ebdbee860a5cd660a907ed",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export { db };
