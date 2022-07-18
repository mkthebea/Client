import React from "react";
import { Badge, Descriptions } from "antd";
import styles from "./DetailPage.module.css";

function DetailPage(props) {
  const data = props.data;
  const name = data.name;
  const waiting = data.waiting;
  const tags = data.tags;
  const date = data.date;
  const description = data.description;
  const id = data.id;

  return (
    <div className={styles.container}>
      <Descriptions title="매칭 정보" bordered>
        <Descriptions.Item label="맛집">{name}</Descriptions.Item>
        <Descriptions.Item label="대기자 수">{waiting}</Descriptions.Item>
        <Descriptions.Item label="매칭 조건">{[...tags].join(", ")}</Descriptions.Item>
        <Descriptions.Item label="날짜">{date}</Descriptions.Item>
        <Descriptions.Item label="한줄 소개">{description}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailPage;
