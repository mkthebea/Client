import React from "react";
import { Badge, Descriptions } from "antd";
import styles from "./DetailPage.module.css";
import moment from "moment";
import "moment/locale/ko";

function DetailPage(props) {
  const data = props.data;
  const name = data.name;
  const waiting = data.waiting;
  const tags = data.tags;
  const date = data.date;
  const description = data.description;
  const max = data.max;
  const id = data.id;

  return (
    <div className={styles.container}>
      <Descriptions title="매칭 정보" bordered>
        <Descriptions.Item label="맛집">{name}</Descriptions.Item>
        <Descriptions.Item label="대기자 수">{waiting}</Descriptions.Item>
        <Descriptions.Item label="매칭 조건">
          성별: {[...tags][0]} <br />
          학과: {[...tags][1]} <br />
          만남 모드: {[...tags][2]} <br />
        </Descriptions.Item>
        <Descriptions.Item label="최대 인원">{max}</Descriptions.Item>
        <Descriptions.Item label="시간">{date}</Descriptions.Item>
        <Descriptions.Item label="한줄 소개">{description}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailPage;
