
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function saveTree(user, tree) {
  const treeRef = doc(db, "trees", user.uid);

  const data = {
    email: user.email,
    root: JSON.parse(JSON.stringify(tree.root))
  };

  await setDoc(treeRef, data);
}

export async function loadTree(user) {
  const treeRef = doc(db, "trees", user.uid);
  const result = await getDoc(treeRef);

  if (result.exists()) {
    return result.data();
  }

  return null;
}
