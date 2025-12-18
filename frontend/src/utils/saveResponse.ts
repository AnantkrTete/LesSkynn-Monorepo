import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveAnswer = async (
  userId: string | null,
  key: string,
  value: any
) => {
  if (!userId) {
    console.error("saveAnswer called without userId");
    return;
  }

  const ref = doc(db, "quizResponses", userId);

  await setDoc(
    ref,
    { [key]: value },
    { merge: true }
  );
};
