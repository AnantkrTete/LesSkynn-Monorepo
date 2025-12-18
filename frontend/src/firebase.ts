import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjxCvXn4phYF1EWJQv9W_9zeSqV6FJ4eg",
  authDomain: "skincare-project-df65c.firebaseapp.com",
  projectId: "skincare-project-df65c",
  storageBucket: "skincare-project-df65c.appspot.com",   // ✔ Correct
  messagingSenderId: "22113075004",
  appId: "1:22113075004:web:761fb8a35118319d15a839",
  measurementId: "G-Q415LWN7E1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
