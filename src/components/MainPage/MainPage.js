import React from "react";
import { Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";

function MainPage() {
  const columns = [
    {
      title: "맛집",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "대기자 수",
      dataIndex: "await",
      key: "await",
      filterSearch: true,
    },
    {
      title: "매칭 조건",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";

            if (tag === "여성") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "매칭 신청",
      key: "action",
      render: (_, record) => (
        // <Space size="middle">
        <Link to="/detail">신청</Link>
        // </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "우뇽파스타",
      await: 2,
      tags: ["산업보안학과", "여성"],
    },
    {
      key: "2",
      name: "북촌순두부",
      await: 0,
      tags: ["남성"],
    },
    {
      key: "3",
      name: "카우버거",
      await: 1,
      tags: ["소프트웨어학과"],
    },
  ];
  return (
    <>
      {/* <div className={styles.title}>맛칭 리스트</div> */}
      <div className={styles.table_container}>
        <Table columns={columns} dataSource={data} className={styles.table} />
      </div>
    </>
  );
}

export default MainPage;
