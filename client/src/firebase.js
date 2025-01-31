// src/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration from Firebase console
const firebaseConfig = {
  apiKey: 'AIzaSyBoYm0eqtGFQ3dzPL-C4zHR0fKLxVAooMg',
  authDomain: 'dashboard-b561b.firebaseapp.com',
  projectId: 'dashboard-b561b',
  storageBucket: 'dashboard-b561b.firebasestorage.app',
  messagingSenderId: '987866066394',
  appId: '1:987866066394:web:fa5d6df616c89cfc1aa4e3',
  measurementId: 'G-KYCQ39XEWJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
