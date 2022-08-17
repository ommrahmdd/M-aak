import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./config";

let usersRef = collection(db, "users");
export let singup = async (userData) => {
  try {
    let userAuth = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    let userSnap = await addDoc(usersRef, {
      ...userData,
      authId: userAuth.user.uid,
    });
    localStorage.setItem("Ma3akToken", userAuth.user.accessToken);
    return userSnap.id;
  } catch (err) {
    console.log("error", { ...err });
    return err.code;
  }
};
export let login = async (email, password) => {
  try {
    let userAuth = await signInWithEmailAndPassword(auth, email, password);
    if (userAuth) {
      localStorage.setItem("Ma3akToken", userAuth.user.accessToken);
    }
  } catch (err) {
    return err.code;
  }
};
