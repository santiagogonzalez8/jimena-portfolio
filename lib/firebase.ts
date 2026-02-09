import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUwmJIcqfOoI4cvkF3OxqdAn8y2cuRjUQ",
  authDomain: "jimena-portfolio-62a69.firebaseapp.com",
  projectId: "jimena-portfolio-62a69",
  storageBucket: "jimena-portfolio-62a69.firebasestorage.app",
  messagingSenderId: "946822109743",
  appId: "1:946822109743:web:04930c091a90eacc3d04da"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);