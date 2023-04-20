import { app } from "../index";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const db = getFirestore(app);

// 사용 가능한 collection 이름
export const ALLOWED_COLLECTIONS = ["accounts"];

// Collection reference는 한 번만 받아 놓기
export const _collections = {
  accounts: collection(db, "accounts"),
};
