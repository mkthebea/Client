import React, { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Select, Alert, Result } from "antd";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);

  // 닉네임 리스트 서버에 요청
  const [nicknameList, setNicknameList] = useState([]);
  const fetchNicknameList = async () => {
    const response = await axios.get("https://052bfbc0-39d2-45b5-af89-680415b4bd7c.mock.pstmn.io/profile/nickname/");
    setNicknameList(response.data.nicknameList);
    // console.log(response.data.nicknameList, nicknameList);
  };
  useEffect(() => {
    fetchNicknameList();
  }, []);

  const fetchSignUp = async (values) => {
    const accountData = { userEmail: values.userEmail, password: values.password };
    let profileData = { nickname: values.nickname, major: values.major, gender: values.gender };

    await axios.post("https://052bfbc0-39d2-45b5-af89-680415b4bd7c.mock.pstmn.io/account/signup/", accountData).then((response) => {
      if (response.data.success) {
        setSignUp(response.data.success);
        console.log("account 응답: ", response);
        console.log("account 전송 데이터: ", accountData);

        //account_id
        profileData["accountId"] = response.data.accountId;
        axios.post("https://052bfbc0-39d2-45b5-af89-680415b4bd7c.mock.pstmn.io/profile/", profileData).then((response2) => {
          // console.log("profile 응답: ", response2);
          // console.log("profile 전송 데이터: ", profileData);
        });
      } else {
        message.error("에러 발생");
      }
      // console.log("전송 데이터: ", values, "\n응답: ", response);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const onFinish = async (values) => {
    console.log("values: ", values);
    if (values.password !== values.okPassword) {
      message.error("비밀번호 확인이 틀립니다.");
    } else if (nicknameList.includes(values.nickname)) {
      message.error("사용할 수 없는 닉네임입니다.");
    } else {
      values.userEmail += "@cau.ac.kr";
      fetchSignUp(values);
    }

    // fetchSignUp(values);
    // console.log("Success:", values);
    // window.location.replace("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <Result icon={<SmileOutlined />} title="학교 이메일로 인증 메일을 보냈어요." subTitle="이메일 인증을 마치면 회원가입이 완료됩니다." />
        ) : (
          <>
            <Alert message="실제와 다른 정보로 활동할 경우 계정이 영구 정지됩니다." banner closable className={styles.banner} />
            <Alert message="지금 입력하는 정보는 수정이 불가능합니다. 신중히 입력하세요." banner closable className={styles.banner} />

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
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className={styles.text}>회원 가입</div>
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

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="비밀번호 확인"
                name="okPassword"
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인을 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="닉네임"
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: "닉네임을 입력하세요.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="학과"
                name="major"
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인을 입력하세요.",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="bi">경영학과</Select.Option>
                  <Select.Option value="ec">경제학과</Select.Option>
                  <Select.Option value="ad">광고홍보학과</Select.Option>
                  <Select.Option value="ma">기계공학과</Select.Option>
                  <Select.Option value="gm">국제물류학과</Select.Option>
                  <Select.Option value="st">응용통계학과</Select.Option>
                  <Select.Option value="is">산업보안학과</Select.Option>
                  <Select.Option value="sw">소프트웨어학과</Select.Option>
                  <Select.Option value="etc">기타</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="성별"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "성별을 입력하세요.",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="w">여성</Select.Option>
                  <Select.Option value="m">남성</Select.Option>
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
