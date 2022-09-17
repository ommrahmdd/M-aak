import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
let casesRef = collection(db, "cases");
// HANDLE: get all cases
export let getAllCases = async () => {
  let docsRef = await getDocs(casesRef);
  let cases = docsRef.docs.map((data) => ({
    ...data.data(),
    caseID: data.id,
  }));
  return cases;
};

// HANDLE: get case by case id
export let getCaseByID = async (id) => {
  let docRef = doc(db, "cases", id);
  let _case = await getDoc(docRef);
  return {
    ..._case.data(),
  };
};
// HANDLE: Update Case
export let updateCase = async (id, amount) => {
  let docRef = doc(db, "cases", id);
  let _case = await getDoc(docRef);
  let _caseCollectedAmount = _case.data().collectedDebt;
  await updateDoc(docRef, {
    collectedDebt: _caseCollectedAmount + amount,
  });
};

// HANDLE: filter cases
export let filterCases = async (filtering) => {
  let q = query(casesRef, orderBy("debt"));
  let docsRef = await getDocs(q);
  let cases = docsRef.docs.map((data) => ({
    ...data.data(),
    caseID: data.id,
  }));

  switch (filtering) {
    case "less":
      return cases;
      break;
    case "most":
      return cases.reverse();
      break;
    default:
      return cases;
  }
};
