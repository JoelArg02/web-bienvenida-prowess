// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzeGv9d6GMXqIxBWDYn_m7SPpUkbJZPFw",
  authDomain: "joelarg02.firebaseapp.com",
  databaseURL: "https://joelarg02.firebaseio.com",
  projectId: "joelarg02",
  storageBucket: "joelarg02.appspot.com",
  messagingSenderId: "945158635564",
  appId: "1:945158635564:web:454710033aa1a3c79ed189",
  measurementId: "G-ZK0S79TG2X"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
