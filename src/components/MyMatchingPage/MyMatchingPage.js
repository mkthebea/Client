import React from "react";
import styles from "./MyMatchingPage.module.css";
import { Button, Card, List } from "antd";
import moment from "moment";

function MyMatchingPage() {
  const data = [
    {
      name: "우뇽파스타",
      date: "2022-08-1 16:00",
      id: 1,
    },
    {
      name: "중대양곱창",
      date: "2022-08-4 00:30",
      id: 2,
    },
    {
      name: "피맥하우스",
      date: "2022-08-4 00:50",
      id: 3,
    },
    {
      name: "북촌순두부",
      date: "2022-08-10 16:00",
      id: 4,
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
      if (diffDay == 0 && diffHour == 0 && diffMin <= 30) {
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
  const onReport = (id) => {
    console.log("report: ", id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>My MatChing</div>
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
                        onReport(item.id);
                      }}
                      className={styles.content_button}
                    >
                      신고하기
                    </Button>
                  ) : (
                    <Button
                      disabled
                      onClick={() => {
                        onReport(item.id);
                      }}
                      className={styles.content_button}
                    >
                      신고하기
                    </Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default MyMatchingPage;
