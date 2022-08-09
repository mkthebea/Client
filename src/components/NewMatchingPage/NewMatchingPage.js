import React, { useState } from "react";
import { Button, TimePicker, DatePicker, Form, Input, InputNumber, Select, message } from "antd";
import styles from "./NewMatchingPage.module.css";

function NewMatchingPage() {
  const { TextArea } = Input;

  const onFinish = (values) => {
    let data = values;
    // const date = data["date"].format("YYYY-MM-DD");
    // const startTime = data["startTime"].format("HH:MM");
    // const endTime = data["time"][1].format("HH:MM");

    // data[date] = date + " " + startTime + " ~ " + endTime;

    data["date"] = data["date"].format("YYYY-MM-DD");
    data["startTime"] = data["startTime"].format("HH:MM");

    // 매칭 등록 요청 보내기
    const res = true; // Success
    if (res) {
      console.log("Success:", data);
      message.success("등록 완료!");
    } else {
      message.error("에러 발생, 다시 시도하세요.");
    }

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
          <Form.Item label="식당 이름" name={"name"} rules={[{ required: true, message: "식당 이름을 입력하세요" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="성별" name={["tags", "gender"]} rules={[{ required: true, message: "성별을 선택하세요" }]}>
            <Select>
              <Select.Option value="woman">여성</Select.Option>
              <Select.Option value="man">남성</Select.Option>
              <Select.Option value="both">성별 무관</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="학과" name={["tags", "major"]} rules={[{ required: true, message: "학과를 선택하세요" }]}>
            <Select>
              <Select.Option value="is">산업보안학과</Select.Option>
              <Select.Option value="sw">소프트웨어학과</Select.Option>
              <Select.Option value="all">학과 무관</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="만남 모드" name={["tags", "mode"]} rules={[{ required: true, message: "만남 모드를 선택하세요" }]}>
            <Select>
              <Select.Option value="eat">밥만 먹어요</Select.Option>
              <Select.Option value="friend">우리 친해져요</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="날짜 및 시간"
            style={{
              marginBottom: 0,
            }}
          >
            <Input.Group compact>
              <Form.Item name={"date"} rules={[{ required: true, message: "날짜를 선택하세요" }]} style={{ marginRight: "10px" }}>
                <DatePicker />
              </Form.Item>
              <Form.Item name={"startTime"} rules={[{ required: true, message: "시작 시간을 선택하세요" }]}>
                <TimePicker />
              </Form.Item>
              <span style={{ margin: "0 10px 0 10px", lineHeight: "30px" }}> 부터 </span>
              <Form.Item name={"duration"} rules={[{ required: true, message: "총 매칭 시간을 선택하세요" }]}>
                <Select style={{ width: "10vw" }}>
                  <Select.Option value="0시간 30분">0시간 30분</Select.Option>
                  <Select.Option value="1시간 0분">1시간 0분</Select.Option>
                  <Select.Option value="1시간 30분">1시간 30분</Select.Option>
                  <Select.Option value="2시간 0분">2시간 0분</Select.Option>
                  <Select.Option value="2시간 30분">2시간 30분</Select.Option>
                  <Select.Option value="3시간 0분">3시간 0분</Select.Option>
                  <Select.Option value="3시간 30분">3시간 30분</Select.Option>
                  <Select.Option value="4시간 0분">4시간 0분</Select.Option>
                  <Select.Option value="4시간 30분">4시간 30분</Select.Option>
                </Select>
              </Form.Item>
              <span style={{ margin: "0 10px 0 10px", lineHeight: "30px" }}> 동안 </span>
            </Input.Group>
          </Form.Item>
          <Form.Item label="최소 인원" name={"min"} rules={[{ required: true, message: "최소 인원을 입력하세요" }]}>
            <InputNumber min={2} max={9} defaultValue={2} />
          </Form.Item>
          <Form.Item label="최대 인원" name={"max"} rules={[{ required: true, message: "최대 인원을 입력하세요" }]}>
            <InputNumber min={2} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item label="한줄 소개" name={"description"}>
            <TextArea rows={3} placeholder="maxLength is 30" maxLength={30} />
          </Form.Item>

          <Form.Item
            className={styles.button_container}
            wrapperCol={{
              offset: 11,
              // span: 12,
            }}
          >
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
