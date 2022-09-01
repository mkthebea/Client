// users: 인증 서버의 데이터베이스 역할
const users = [
  { email: "a", password: "a", name: "Kim" },
  { email: "kim@test.com", password: "123", name: "Kim" },
  { email: "lee@test.com", password: "456", name: "Lee" },
  { email: "park@test.com", password: "789", name: "Park" },
];

// 인자로 넘어온 email과 password로 데이터베이스를 조회
// 사용자가 조회되지 않으면 예외를 던지고, 조회되면 해당 사용자를 반환
export function signIn({ email, password }) {
  const user = users.find((user) => user.email === email && user.password === password);
  //   console.log("signIn user: ", user);
  //   if (user === undefined) throw new Error();
  //   return user;
  if (user === undefined) return false;
  return true;
}
