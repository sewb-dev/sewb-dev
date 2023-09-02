import { initializeApp } from "firebase/app";

const firebase = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: "https://qnagenius-cbb8d-default-rtdb.firebaseio.com/",
  projectId: process.env.FIREBASE_PROJECT_ID,
//   appId: process.env.FIREBASE_APP_ID,
});

export { firebase };
