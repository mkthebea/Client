import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Checkbox, Form, Input, message } from "antd";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { signIn } from "../Auth/Auth";

function LoginPage({ setAuthenticated }) {
  // const [login, setLogin] = useState(false);
  // const fetchLogin = () => {
  //   setLogin(!login);
  //   console.log("로그인 상태: ", login);
  // };

  // 임시 로그인 데이터베이스 인증 구현
  // const onFinish = (values) => {
  //   console.log("로그인 시도: ", values);
  //   const res = signIn(values);
  //   console.log("로그인 결과: ", res);
  //   if (res) {
  //     setAuthenticated(true);
  //     message.success("로그인 성공");
  //     // setTimeout(() => {
  //     //   window.location.replace("/");
  //     // }, 1000);
  //   }
  // };
  // 여기까지

  const onFinish = async (values) => {
    // 로그인 성공시 메인 페이지로 이동
    // console.log("send data: ", values);
    const response = await axios.post("https://052bfbc0-39d2-45b5-af89-680415b4bd7c.mock.pstmn.io/account/login/", values);
    console.log("send data: ", values);
    console.log("response: ", response);
    if (response.data.success) {
      message.success("로그인 성공");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      message.error("로그인 실패");
    }

    // fetchLogin();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>로그인</div>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="학교 이메일"
            name="email"
            rules={[
              {
                required: true,
                message: "학교 이메일 주소를 입력하세요.",
              },
            ]}
          >
            <Input addonAfter="@cau.ac.kr" />
          </Form.Item>

          <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: "비밀번호를 입력하세요." }]}>
            <Input.Password />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 7, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <span style={{ marginLeft: "50px" }}>No Account? </span>
            <Link to="/signup">
              <u>Sign Up MatChing</u>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
