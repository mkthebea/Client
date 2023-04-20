import { createDocument, getDocsWithFormat } from "./index";

const COLLECTION_NAME = "accounts";

function parseAccountDoc(rawDoc) {
  const id = rawDoc.id;
  const data = rawDoc.data;

  return {
    id: id,
    name: data.name,
    password: data.password,
    authUid: data.authUid,
  };
}

// 회원 가입된 계정의 uid로 계정 정보가 생성된 프로필을 만들고,
// 만들어진 프로필의 id를 반환
export async function createAccount(uid, profileData) {
  const createdAccount = await createDocument(COLLECTION_NAME, {
    ...profileData,
    authUid: uid,
  });

  return createdAccount.id;
}

// 등록된 계정 목록 조회
export async function getAccounts() {
  const ret = await getDocsWithFormat(COLLECTION_NAME, parseAccountDoc);
  return ret;
}
