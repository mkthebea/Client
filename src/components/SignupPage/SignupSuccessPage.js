import React, { useState, useEffect } from "react";
import { Result, Button } from "antd";
import styles from "./SignupPage.module.css";

function SignupSuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <Result
          status="success"
          title="회원 가입 성공!"
          subTitle="이메일 인증을 완료했습니다."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                window.location.replace("/login");
              }}
            >
              로그인 하러 가기
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default SignupSuccessPage;
