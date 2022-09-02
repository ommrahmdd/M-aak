import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
