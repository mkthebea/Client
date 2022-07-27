import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import Highlighter from "react-highlight-words";
import styles from "./MainPage.module.css";
import moment from "moment";
import "moment/locale/ko";

import DetailPage from "../DetailPage/DetailPage";

function MainPage() {
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    key: "",
    name: "",
    waiting: 0,
    tags: [],
    date: "",
    description: "",
    id: 0,
  });

  // 모달 키 관리
  const [Id, setId] = useState(0);

  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("매칭 신청: ", { id: Id });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 검색창 관리
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(0);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // 테이블 데이터
  const columns = [
    {
      title: "맛집",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
      width: "200px",
      align: "center",
    },
    {
      title: "대기중인 매칭",
      dataIndex: "waiting",
      key: "waiting",
      sorter: (a, b) => a.waiting - b.waiting,
      sortDirections: ["descend", "ascend"],
      width: "150px",
      align: "center",
    },
    // {
    //   title: "최대 인원",
    //   dataIndex: "max",
    //   key: "max",
    //   sorter: (a, b) => a.max - b.max,
    //   sortDirections: ["descend", "ascend"],
    //   width: "130px",
    //   align: "center",
    // },
    {
      title: "매칭 조건",
      key: "tags",
      dataIndex: "tags",
      // key: "matchings",
      // dataIndex: "matchings",

      filters: [
        {
          text: "성별",
          value: "성별",
          children: [
            {
              text: "여성",
              value: "여성",
            },
            {
              text: "남성",
              value: "남성",
            },
            {
              text: "성별 무관",
              value: "성별 무관",
            },
          ],
        },
        {
          text: "학과",
          value: "학과",
          children: [
            {
              text: "산업보안학과",
              value: "산업보안학과",
            },
            {
              text: "소프트웨어학과",
              value: "소프트웨어학과",
            },
            {
              text: "모든 학과",
              value: "모든 학과",
            },
          ],
        },
        {
          text: "만남 모드",
          value: "만남 모드",
          children: [
            {
              text: "밥만 먹어요",
              value: "밥만 먹어요",
            },
            {
              text: "우리 친해져요",
              value: "우리 친해져요",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tags.includes(value),

      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "magenta";

            if (tag === "모든 학과") {
              color = "gold";
            }

            if (tag === "여성") {
              color = "volcano";
            }
            if (tag === "남성") {
              color = "orange";
            }
            if (tag === "성별 무관") {
              color = "purple";
            }

            if (tag === "우리 친해져요") {
              color = "lime";
            }
            if (tag === "밥만 먹어요") {
              color = "cyan";
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
    // {
    //   title: "시간",
    //   dataIndex: "date",
    //   key: "date",
    //   // render: (time) => <>{time.format("YYYY-MM-DD hh:mm")}</>,
    //   // sorter: (a, b) => a.date - b.date,
    //   // sortDirections: ["descend", "ascend"],
    //   width: "250px",
    //   align: "center",
    // },
    {
      title: "매칭 신청",
      key: "action",
      render: (data) => (
        // <Space size="middle">
        // <Link to="/detail">신청하기😋</Link>
        // <Button type="primary" onClick={showModal}>
        //   신청하기😋
        // </Button>
        <Space>
          <Button onClick={() => showModal(data)}>신청하기😋</Button>
        </Space>
      ),
      width: "150px",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      name: "우뇽파스타",
      waiting: 2,
      matchings: [
        {
          tags: ["여성", "산업보안학과", "우리 친해져요"],
          date: "2022-08-10 16:00",
          description: "여기 맛있어요!",
          max: 5,
          id: 1,
        },
        {
          tags: ["여성", "산업보안학과", "밥만 먹어요"],
          date: "2022-08-10 16:00",
          description: "같이 가요~",
          max: 3,
          id: 2,
        },
      ],
    },
    {
      key: "2",
      name: "북촌순두부",
      waiting: 1,
      matchings: [
        {
          tags: ["남성", "경영학과", "밥만 먹어요"],
          date: "2022-07-20 16:00",
          description: "햄치즈 순두부 맛집",
          max: 2,
          id: 3,
        },
      ],
    },
    {
      key: "3",
      name: "카우버거",
      waiting: 5,
      matchings: [
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          date: "2022-08-18 16:00",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 2,
          id: 4,
        },
        {
          tags: ["여성", "모든 학과", "우리 친해져요"],
          date: "2022-08-18 16:00",
          description: "",
          max: 2,
          id: 5,
        },
        {
          tags: ["남성", "소프트웨어학과", "밥만 먹어요"],
          date: "2022-08-18 16:00",
          description: "배고파요",
          max: 2,
          id: 6,
        },
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          date: "2022-08-18 16:00",
          description: "카벅",
          max: 2,
          id: 7,
        },
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          date: "2022-08-18 16:00",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 2,
          id: 8,
        },
      ],
    },
    {
      key: "4",
      name: "라이스&포테이토",
      waiting: 1,
      matchings: [
        {
          tags: ["성별 무관", "산업보안학과", "우리 친해져요"],
          date: "2022-07-30 15:00",
          description: "근본 밥약 장소.. 랄까?",
          max: 2,
          id: 9,
        },
      ],
    },
    {
      key: "5",
      name: "장독대",
      waiting: 1,
      matchings: [
        {
          tags: ["성별 무관", "국제물류학과", "우리 친해져요"],
          date: "2022-07-30 16:00",
          description: "꿀막걸리 먹을 사람 구해요",
          max: 2,
          id: 10,
        },
      ],
    },
    {
      key: "6",
      name: "인근주민",
      waiting: 1,
      matchings: [
        {
          tags: ["여성", "모든 학과", "우리 친해져요"],
          date: "2022-08-19 16:00",
          description: "간술~",
          max: 2,
          id: 11,
        },
      ],
    },
    {
      key: "7",
      name: "엉터리생고기",
      waiting: 1,
      matchings: [
        {
          tags: ["남성", "기계공학과", "우리 친해져요"],
          date: "2022-08-11 16:00",
          description: "과제메이트 겸 고기메이트 찾습니다",
          max: 2,
          id: 12,
        },
      ],
    },
    {
      key: "8",
      name: "중대양곱창",
      waiting: 1,
      matchings: [
        {
          tags: ["성별 무관", "모든 학과", "밥만 먹어요"],
          date: "2022-08-10 16:00",
          description: "곱창 혼밥은 싫어서..",
          max: 2,
          id: 13,
        },
      ],
    },
  ];

  data.forEach((data) => {
    data.tags = [
      ...new Set(
        data.matchings.reduce((acc, cur) => {
          acc.push(...cur.tags);
          return acc;
        }, [])
      ),
    ];
  });

  return (
    <div className={styles.container}>
      <h1>
        <span>M</span>
        <span>a</span>
        <span>t</span>
        <span>C</span>
        <span>h</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>&nbsp;</span>
        <span>N</span>
        <span>o</span>
        <span>w</span>
        <span>!</span>
      </h1>
      <div className={styles.table_container}>
        <Table scroll={{ y: "65vh" }} pagination={false} columns={columns} dataSource={data} className={styles.table} />
      </div>
      <Modal title="매칭 신청" cancelText="취소" okText="신청하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered="true" width="80%">
        <DetailPage data={modalData} setId={setId} />
      </Modal>
    </div>
  );
}

export default MainPage;
