import React, { useState } from "react";
import styles from "./MyMatchingPage.module.css";
import { Button, Card, List, Modal, Select, Checkbox, Input, Form, message } from "antd";

import moment from "moment";

function MyMatchingPage() {
  const { Option } = Select;
  const { TextArea } = Input;

  const data = [
    {
      name: "우뇽파스타",
      date: "2022-08-13 13:00",
      id: 1,
      follower: ["밈갬", "영갬", "오구"],
    },
    {
      name: "중대양곱창",
      date: "2022-08-12 21:00",
      id: 2,
      follower: ["밈갬", "영갬", "오구"],
    },
    {
      name: "피맥하우스",
      date: "2022-08-04 11:50",
      id: 3,
      follower: ["밈갬", "영갬", "오구"],
    },
    {
      name: "북촌순두부",
      date: "2022-08-01 16:00",
      id: 4,
      follower: ["밈갬", "영갬", "오구"],
    },
  ];
  const nowTime = new Date();

  data.forEach((item) => {
    const diff = new Date(item.date) - nowTime;
    let remain = "";
    if (diff <= 0) {
      remain += "매칭 완료";
      item["status"] = "done";
    } else {
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (diffDay > 0) {
        remain += diffDay + "일 ";
      }
      const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
      if (diffHour > 0) {
        remain += diffHour + "시간 ";
      }
      const diffMin = Math.floor((diff / (1000 * 60)) % 60);
      if (diffMin > 0) {
        remain += diffMin + "분 ";
      }
      remain += "남음";
      if (diffDay == 0 && diffHour == 0 && diffMin <= 59) {
        item["status"] = "coming";
      } else {
        item["status"] = "";
      }
      // const diffSec = Math.floor((diff / 1000) % 60);
    }

    item["remain"] = remain;
  });

  const onCancel = (id) => {
    console.log("cancel: ", id);
  };
  const onReport = (id, follower) => {
    setIsModalVisible(true);
    setModalData(follower);
    console.log("report: ", id);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [reportData, setReportData] = useState({ name: [], category: "", desc: "" });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    // 신고 요청 보내기
    const res = true;
    if (res) {
      message.success("신고 완료");
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    } else {
      message.error("에러 발생: 잠시 후 다시 시도하세요.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>내 맛칭</div>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name} hoverable="true" headStyle={{ fontSize: "18px" }}>
                <div className={styles.content_container}>
                  <div>
                    <span className={styles.date_text}>{item.date} &nbsp;&nbsp;</span>
                    <span className={styles.diff_text}>{item.remain}</span>
                  </div>
                  {item.status === "" ? (
                    <Button
                      onClick={() => {
                        onCancel(item.id);
                      }}
                      className={styles.content_button}
                    >
                      매칭 취소
                    </Button>
                  ) : (
                    <Button
                      disabled
                      onClick={() => {
                        onCancel(item.id);
                      }}
                      className={styles.content_button}
                    >
                      매칭 취소
                    </Button>
                  )}

                  {item.status === "done" ? (
                    <Button
                      onClick={() => {
                        onReport(item.id, item.follower);
                      }}
                      className={styles.content_button}
                    >
                      신고하기
                    </Button>
                  ) : (
                    <Button disabled className={styles.content_button}>
                      신고하기
                    </Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Modal title="신고하기" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width="60%">
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
              label="신고할 닉네임"
              name="nickname"
              rules={[
                {
                  required: true,
                  message: "신고할 닉네임을 선택하세요",
                },
              ]}
            >
              <Checkbox.Group options={modalData} />
            </Form.Item>

            <Form.Item label="신고 항목 선택" name="category" rules={[{ required: true, message: "신고 항목을 선택하세요." }]}>
              <Select>
                <Option value="노쇼">노쇼</Option>
                <Option value="비매너">비매너</Option>
                <Option value="정보와 다른 사람">정보와 다른 사람</Option>
              </Select>
            </Form.Item>

            <Form.Item label="설명" name="desc">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                신고하기
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default MyMatchingPage;
