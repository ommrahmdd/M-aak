// import {} from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBOEfWCN7FxfgpqK92POttIEpQHIC7MZ5w",
  authDomain: "ma3ak-8a0f6.firebaseapp.com",
  projectId: "ma3ak-8a0f6",
  storageBucket: "ma3ak-8a0f6.appspot.com",
  messagingSenderId: "544989186251",
  appId: "1:544989186251:web:97aa5b512849b278c5b34e",
};

export let app = initializeApp(firebaseConfig);
export let db = getFirestore(app);
export let auth = getAuth();
