import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

console.log(require("../soma-babyak-firebase-adminsdk-wg1rc-8d75b8a06a.json"));

const firebaseConfig = require("../soma-babyak-firebase-adminsdk-wg1rc-8d75b8a06a.json");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
