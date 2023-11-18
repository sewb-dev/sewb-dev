import { initializeApp } from 'firebase/app';
import envVariables from './env';

const firebaseConfig = {
  apiKey: envVariables.getEnv('FIREBASE_KEY'),
  databaseURL: envVariables.getEnv('FIREBASE_DATABASE_URL'),
  projectId: envVariables.getEnv('FIREBASE_PROJECT_ID'),
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
