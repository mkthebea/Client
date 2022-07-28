import React, { useState } from "react";
import { Button, Cascader, TimePicker, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from "antd";
import styles from "./NewMatchingPage.module.css";

function NewMatchingPage() {
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log("Success:", values);
    // window.location.replace("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>New MatChing</div>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label="식당 이름" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="성별" name={["tags", "gender"]}>
            <Select>
              <Select.Option value="woman">여성</Select.Option>
              <Select.Option value="man">남성</Select.Option>
              <Select.Option value="both">성별 무관</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="학과" name={["tags", "major"]}>
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="만남 모드" name={["tags", "mode"]}>
            <Select>
              <Select.Option value="eat">밥만 먹어요</Select.Option>
              <Select.Option value="friend">우리 친해져요</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="날짜" name={"date"}>
            <DatePicker /> &nbsp;&nbsp;
            <TimePicker.RangePicker />
          </Form.Item>
          <Form.Item label="최대 인원" name={"max"}>
            <InputNumber min={2} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item label="한줄 소개" name={"description"}>
            <TextArea rows={3} placeholder="maxLength is 30" maxLength={30} />
          </Form.Item>

          <Form.Item className={styles.button_container}>
            <Button type="primary" htmlType="submit" className={styles.button}>
              등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewMatchingPage;
