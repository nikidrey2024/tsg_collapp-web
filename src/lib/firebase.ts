import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const validateFirebaseConfig = (config: typeof firebaseConfig) => {
  if (!config.apiKey) {
    throw new Error(
      "Firebase configuration error: Missing API key. " +
      "Please ensure NEXT_PUBLIC_FIREBASE_API_KEY is set in your .env.local file " +
      "and matches the value from your Firebase Console."
    );
  }

  const missingFields = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key.replace('NEXT_PUBLIC_FIREBASE_', ''));

  if (missingFields.length > 0) {
    console.warn(
      `Firebase configuration warning: Missing fields - ${missingFields.join(', ')}. ` +
      "Some Firebase services may not work properly."
    );
  }
};


let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  validateFirebaseConfig(firebaseConfig);
  
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  

  if (process.env.NODE_ENV === 'development') {
    console.warn('Creating dummy Firebase app for development');
    app = initializeApp({
      apiKey: 'dummy-key',
      authDomain: 'dummy.firebaseapp.com',
      projectId: 'dummy-project',
      storageBucket: 'dummy.appspot.com',
      messagingSenderId: '1234567890',
      appId: '1:1234567890:web:dummy'
    }, 'DummyApp');
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    throw new Error('Firebase initialization failed in production');
  }
}

export { app, auth, db };