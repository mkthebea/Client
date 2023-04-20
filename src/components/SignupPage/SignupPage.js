import React, { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Alert,
  Result,
} from "antd";
import styles from "./SignupPage.module.css";

import { signUp as doSignUp } from "../../firebase/auth/signUp";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);

  const fetchSignUp = async (values) => {
    const accountData = {
      email: values.userEmail,
      password: values.password,
    };

    let profileData = {
      name: values.name,
      accountType: values.accountType,
    };

    try {
      const { accessToken, profileId } = await doSignUp(
        accountData,
        profileData
      );
      console.log("accessToken:", accessToken);
      console.log("profileId:", profileId);

      alert(JSON.stringify(accessToken));
    } catch (e) {
      alert(`${e.code} : ${e.message}`);
    }

    // await axios.post("/api/account/signup/", accountData).then((response) => {
    //   if (response.data.success) {
    //     setSignUp(response.data.success);
    //     // console.log("account 응답: ", response);
    //     // console.log("account 전송 데이터: ", accountData);

    //     //account_id
    //     profileData["accountId"] = response.data.accountId;
    //     axios.post("/api/profile/", profileData).then((response2) => {
    //       // console.log("profile 응답: ", response2);
    //       // console.log("profile 전송 데이터: ", profileData);
    //     });
    //   } else {
    //     message.error("에러 발생");
    //   }
    // });
  };

  const onFinish = async (values) => {
    console.log("values: ", values);
    if (values.password !== values.okPassword) {
      message.error("비밀번호 확인이 틀립니다.");
    } else {
      fetchSignUp(values);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <Result
            icon={<SmileOutlined />}
            title="학교 이메일로 인증 메일을 보냈어요."
            subTitle="이메일 인증을 마치면 회원가입이 완료됩니다."
          />
        ) : (
          <>
            <Alert
              message="실제와 다른 정보로 활동할 경우 계정이 영구 정지됩니다."
              banner
              closable
              className={styles.banner}
            />
            <Alert
              message="지금 입력하는 정보는 수정이 불가능합니다. 신중히 입력하세요."
              banner
              closable
              className={styles.banner}
            />

            <Form
              className={styles.form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={styles.text}>회원 가입</div>
              <Form.Item
                label="이메일"
                name="userEmail"
                rules={[
                  {
                    required: true,
                    message: "이메일 주소를 입력하세요.",
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
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력하세요.",
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.length < 6) {
                        return Promise.reject(
                          "비밀번호는 6자리 이상이어야 합니다."
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="비밀번호 확인"
                name="okPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인을 입력하세요.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("비밀번호를 다시 확인해 주세요.")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="이름"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "이름을 입력하세요.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="계정 유형"
                name="accountType"
                rules={[
                  {
                    required: true,
                    message: "계정 유형을 선택하세요.",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="trainee">연수생</Select.Option>
                  <Select.Option value="expert">엑스퍼트</Select.Option>
                  <Select.Option value="mentor">멘토</Select.Option>
                  <Select.Option value="etc">etc</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
