import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
let casesRef = collection(db, "cases");
// HANDLE: get all cases
export let getAllCases = async () => {
  let docsRef = await getDocs(casesRef);
  let cases = docsRef.docs.map((data) => data.data());
  return cases;
};
