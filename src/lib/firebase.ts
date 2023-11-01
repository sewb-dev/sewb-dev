import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
