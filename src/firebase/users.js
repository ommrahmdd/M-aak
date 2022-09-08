import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  where,
  getDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
// import firebase from "firebase";
import { db, auth } from "./config";

let usersRef = collection(db, "users");
// HANDLE: singup
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
// HANDLE: login
export let login = async (adminEmail, adminPassword) => {
  try {
    // Check if email is admin or not
    let q = query(collection(db, "admins"), where("email", "==", adminEmail));
    let docsRef = await getDocs(q);
    if (docsRef.docs.length > 0) return "auth/user-not-found";
    else {
      let userAuth = await signInWithEmailAndPassword(
        auth,
        adminEmail,
        adminPassword
      );
      if (userAuth) {
        let user = await getUserByAuthId(userAuth.user.uid);
        localStorage.setItem("Ma3ak_user_id", user.userID);
        console.log(user);
        localStorage.setItem("Ma3akToken", userAuth.user.accessToken);
      }
      return userAuth.user.uid;
    }
  } catch (err) {
    return err.code;
  }
};

// HANDLE: Logout
export let logout = async () => {
  await signOut(auth);
  localStorage.removeItem("Ma3akToken");
  localStorage.removeItem("Ma3ak_user_id");
};

// HANDLE: add bill to user
export let addNewBill = async (userID, bill) => {
  let docRef = doc(db, "users", userID);
  let updateUser = await updateDoc(docRef, {
    bills: arrayUnion(bill),
  });
};

// HANDLE: get user by id
export let getUserByAuthId = async (id) => {
  let q = query(usersRef, where("authId", "==", id));
  let user = await getDocs(q);
  console.log(user.docs);
  return {
    ...user.docs[0].data(),
    userID: user.docs[0].id,
  };
};
// HANDLE: get user by id
export let getUserById = async (id) => {
  let docRef = doc(db, "users", id);
  let user = await getDoc(docRef);
  return {
    ...user.data(),
  };
};
// HANDLE: update user data
export let updateUser = async (id, data) => {
  let docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    ...data,
  });
};
// HANDLE: update password only
export let updateUserPassword = async (id, newPassword) => {
  let docRef = doc(db, "users", id);
  const user = auth.currentUser;
  await updatePassword(user, newPassword);
  await updateDoc(docRef, {
    password: newPassword,
  });
};
// HANDLE: get user bills
export let getUserBills = async (id) => {
  let docRef = doc(db, "users", id);
  let userRef = await getDoc(docRef);
  return {
    bills: userRef.data().bills,
  };
};
