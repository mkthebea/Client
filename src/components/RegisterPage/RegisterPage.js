import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Alert } from "antd";
import styles from "./RegisterPage.module.css";
import axios from "axios";

function RegisterPage() {
  const onFinish = async (values) => {
    values["name"] = values["name"].split(" ").join(""); //문자열 공백 제거
    const response = await axios.post("https://052bfbc0-39d2-45b5-af89-680415b4bd7c.mock.pstmn.io/matzip/create-matzip/", values);
    // console.log("send data: ", values);
    // console.log("response: ", response);
    if (response.data.success) {
      console.log("Success");
      message.success("식당 등록 성공!");
    } else {
      // message.error("이미 리스트에 등록된 식당입니다. 맛칭 리스트를 확인하세요.");
      message.error(response.data.errorMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // message.error("에러 발생");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <Alert message="이미 리스트에 있는 식당을 다른 이름으로 등록할 경우 원활한 매칭이 불가합니다. 맛칭 리스트를 먼저 확인한 후 등록해주세요." banner closable className={styles.banner} />
        <div className={styles.text}>식당 등록</div>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="식당 이름"
            name="name"
            rules={[
              {
                required: true,
                message: "식당 이름을 입력하세요.",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
