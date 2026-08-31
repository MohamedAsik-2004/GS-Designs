---
description: How to implement real-time cloud data synchronization between Admin CMS and user visitor pages using Firebase Realtime Database & React Context.
---

# Firebase Realtime CMS & Multi-Visitor Sync Architecture Workflow

This workflow documents how to convert any React/Vite web application from standard ephemeral state into a live, multi-visitor cloud synchronized CMS using Firebase Realtime Database.

---

## 1. Prerequisites & Dependencies

Install Firebase and Firebase CLI in your project:
```bash
npm install firebase
npm install -D firebase-tools
```

---

## 2. Firebase Project & Database Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name your project (e.g., `my-project-id`).
3. Under **Build / Product Categories**, open **Realtime Database** and click **Create Database**.
4. Choose your database location and start in **Test Mode** (or edit security rules).
5. In the **Rules** tab, set public read/write permissions for CMS synchronization:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
6. Click **Publish**.

---

## 3. Firebase Configuration Utility (`src/config/firebase.js`)

Create `src/config/firebase.js` to initialize Firebase and export real-time database helpers with automatic initial data fallback:

```javascript
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Write state update to Firebase Cloud Database
export const syncToFirebase = (key, data) => {
  try {
    const dbRef = ref(db, 'cms/' + key);
    set(dbRef, data);
  } catch (error) {
    console.warn(`[Firebase Sync Error] Failed to write key ${key}:`, error);
  }
};

// Subscribe to real-time changes with initial fallback seeding
export const subscribeToFirebase = (key, callback, initialFallback) => {
  try {
    const dbRef = ref(db, 'cms/' + key);
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else if (initialFallback !== undefined && initialFallback !== null) {
        set(dbRef, initialFallback);
        callback(initialFallback);
      }
    });
  } catch (error) {
    console.warn(`[Firebase Subscribe Error] ${key}:`, error);
  }
};

export default app;
```

---

## 4. Centralized Context Sync (`src/context/ThemeLanguageContext.jsx`)

In your global state provider (React Context), wrap all CMS state hooks with Firebase auto-sync and real-time subscription hooks:

```javascript
import { syncToFirebase, subscribeToFirebase } from '../config/firebase';

// 1. Auto-Save & Cloud Sync Effects
useEffect(() => {
  saveToStorage('gs_admin_services', adminServices);
  syncToFirebase('gs_admin_services', adminServices);
}, [adminServices]);

useEffect(() => {
  saveToStorage('gs_cms_hero', cmsHero);
  syncToFirebase('gs_cms_hero', cmsHero);
}, [cmsHero]);

// 2. Real-time Firebase Database Listeners
useEffect(() => {
  const keys = [
    { key: 'gs_admin_services', setter: setAdminServices, initial: adminServices },
    { key: 'gs_cms_hero', setter: setCmsHero, initial: cmsHero }
  ];

  const unsubscribes = keys.map(({ key, setter, initial }) => {
    return subscribeToFirebase(key, (val) => {
      if (val !== undefined && val !== null) {
        setter(val);
        saveToStorage(key, val);
      }
    }, initial);
  });

  return () => {
    unsubscribes.forEach(unsub => unsub && unsub());
  };
}, []);
```

---

## 5. Centralized Image Compression Utility

To prevent quota overflow in `localStorage` and Realtime Database, compress uploaded images to 400x400 max resolution before storing:

```javascript
export const processImageUpload = (file, callback) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxDim = 400;
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
```

---

## 6. Hosting & Deployment Setup

1. Create `firebase.json` in project root:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

2. Create `.firebaserc` in project root:
```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

3. Add deploy script to `package.json`:
```json
"scripts": {
  "build": "vite build",
  "deploy": "firebase deploy"
}
```

4. Deploy commands:
```bash
npm run build
npx firebase-tools login
npx firebase-tools deploy
```
