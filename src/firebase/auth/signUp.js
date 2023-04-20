import { createAccount } from "../firestore/accounts";
import { auth } from "../index";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
