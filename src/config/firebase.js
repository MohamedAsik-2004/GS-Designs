import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Firebase Configuration extracted from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDHaemrzo45o009cUKU0aWmgI7iYWHVTDI",
  authDomain: "gsdesigns-b7b2e.firebaseapp.com",
  databaseURL: "https://gsdesigns-b7b2e-default-rtdb.firebaseio.com",
  projectId: "gsdesigns-b7b2e",
  storageBucket: "gsdesigns-b7b2e.firebasestorage.app",
  messagingSenderId: "31522490714",
  appId: "1:31522490714:web:78776b3b37cafba5870b63",
  measurementId: "G-YQNLVZT9N5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

// Realtime Database Helper functions for syncing CMS state
export const syncToFirebase = (key, data) => {
  try {
    const dbRef = ref(db, 'cms/' + key);
    set(dbRef, data);
  } catch (error) {
    console.warn(`[Firebase Sync Error] Failed to write key ${key}:`, error);
  }
};

export const subscribeToFirebase = (key, callback, initialFallback) => {
  try {
    const dbRef = ref(db, 'cms/' + key);
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        if (val !== undefined && val !== null) {
          callback(val);
        }
      } else if (initialFallback !== undefined && initialFallback !== null) {
        // If cloud database node is empty, initialize it once
        set(dbRef, initialFallback);
        callback(initialFallback);
      }
    });
  } catch (error) {
    console.warn(`[Firebase Subscribe Error] ${key}:`, error);
  }
};

export default app;
