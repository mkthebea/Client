import { React } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input, message } from "antd";
import styles from "./LoginPage.module.css";

import { signIn } from "../../firebase/auth/core";

function LoginPage(props) {
  // 메인 페이지의 로그인 여부 속성을 제어
  const { setIsLoggedIn } = props;

  const navigate = useNavigate();

  const onFinish = async (values) => {
    let loginData = values;

    try {
      const accessToken = await signIn(loginData.email, loginData.password);
      setIsLoggedIn(true);

      // 로그인 성공시 1초 후 메인 페이지로 이동
      message.success("로그인 성공");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (e) {
      message.error(`로그인 실패: ${e.message}`);
    }
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
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                message: "이메일을 입력해 주세요.",
              },
              {
                type: "email",
                message: "이메일 형식을 확인하세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
          >
            <Input.Password />
          </Form.Item>
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
