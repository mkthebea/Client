import { db } from "../index";
import { collection, getDocs, addDoc } from "firebase/firestore";

// 사용 가능한 collection 이름
const ALLOWED_COLLECTIONS = ["accounts"];

// 사용 가능한 collection 이름인지 확인하고, 허용된 이름이 아닌 경우 Error 발생
// WARNING: 가능하면 해당 함수로 유효성 체크하는 getCollection 이외에 다른 곳에서 collection에 직접 접근하지 않기
function check_collection_name(collectionName) {
  const isAllowed = ALLOWED_COLLECTIONS.filter((v) => v === collectionName);

  if (!isAllowed) {
    throw Error(`Given collection Name ${collectionName} is not allowed.`);
  }
}

// Collection reference는 한 번만 받아 놓기
const _collections = {
  accounts: collection(db, "accounts"),
};

// Document 한 건을 정해진 형식에 맞게 변환하는 함수

// collectionName으로 Collection 가져오기
async function getCollection(collectionName) {
  check_collection_name(collectionName);
  const snapshot = await getDocs(_collections[collectionName]);
  return snapshot;
}

// 조회 시점에 해당 collection에 포함된 모든 document 목록을 가져오는 함수
async function getDocsOf(collectionName) {
  const snapshot = await getCollection(collectionName);
  const ret = [];

  snapshot.forEach((doc) => {
    ret.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return ret;
}

// collectionName에 포함된 document들을 convert하여 반환
export async function getDocsWithFormat(collectionName, converter) {
  const rawDocs = await getDocsOf(collectionName);
  return rawDocs.map((doc) => converter(doc));
}

// collection에 데이터를 추가
export async function createDocument(collectionName, data) {
  const collection = _collections[collectionName];
  const createdDoc = await addDoc(collection, data);
  return createdDoc;
}
