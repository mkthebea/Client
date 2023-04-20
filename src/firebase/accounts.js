import { getDocsWithFormat } from "./core";

const COLLECTION_NAME = "accounts";

function parseAccountDoc(rawDoc) {
  const id = rawDoc.id;
  const data = rawDoc.data;

  return {
    id: id,
    name: data.name,
    password: data.password,
  };
}

// 등록된 계정 목록 조회
export async function getAccounts() {
  const ret = await getDocsWithFormat(COLLECTION_NAME, parseAccountDoc);
  return ret;
}
