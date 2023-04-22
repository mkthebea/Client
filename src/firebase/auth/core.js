import { signInWithEmailAndPassword } from "firebase/auth";
import { createAccount } from "../firestore/accounts";
import { auth } from "./index";
import { createUserWithEmailAndPassword } from "firebase/auth";

// email과 비밀번호로 로그인을 시도하고, 액세스 토큰을 반환한다.
export async function signIn(email, password) {
  const loginResult = await signInWithEmailAndPassword(auth, email, password);
  const user = loginResult.user;

  return user.accessToken;
}

// authData(email, password)와 profileData로 회원 가입을 시도한다.
// 생성된 Profile의 authUid 필드가 회원 가입된 Firebase 계정의 uid를 필드로 가진다.
export async function signUp(authData, profileData) {
  const signUpResult = await createUserWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  );

  const _user = signUpResult.user;
  const profileId = await createAccount(signUpResult.user.uid, profileData);
  return { accessToken: _user.accessToken, profileId: profileId };
}

// 로그아웃 수행
export async function logout() {
  await auth.signOut();
}

// 현재 로그인한 사용자 정보 가져오기 (없을 경우 null)
export function getUser() {
  return auth.currentUser;
}
