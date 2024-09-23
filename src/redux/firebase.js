import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAy3pfrLjCn_unRC51h2OirMzz3qyDWVDg",
  authDomain: "nanny-services-7032a.firebaseapp.com",
  databaseURL: "https://nanny-services-7032a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-services-7032a",
  storageBucket: "nanny-services-7032a.appspot.com",
  messagingSenderId: "710034255632",
  appId: "1:710034255632:web:e8763be096c0e2f181ff95",
  measurementId: "G-PSBBLWGPWK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);