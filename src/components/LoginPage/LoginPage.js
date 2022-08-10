import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Checkbox, Form, Input, message } from "antd";
import styles from "./LoginPage.module.css";

function LoginPage() {
  // const [login, setLogin] = useState(false);
  // const fetchLogin = () => {
  //   setLogin(!login);
  //   console.log("로그인 상태: ", login);
  // };

  const onFinish = (values) => {
    // 로그인 성공시 메인 페이지로 이동
    const login = true; //로그인 요청 응답
    console.log("Success:", values);
    if (login) {
      window.location.replace("/");
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
        <div className={styles.text}>Login</div>
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
            name="userEmail"
            rules={[
              {
                required: true,
                message: "학교 이메일 주소를 입력하세요.",
              },
            ]}
          >
            <Input addonAfter="@cau.ac.kr" />
          </Form.Item>

          <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 7, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
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
