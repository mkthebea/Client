import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal, message } from "antd";
import Highlighter from "react-highlight-words";
import styles from "./MainPage.module.css";
import axios from "axios";

import DetailPage from "../DetailPage/DetailPage";
import { signUp } from "../../firebase/auth";

function MainPage() {
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    waiting: 0,
    tags: [],
    date: "",
    description: "",
    id: 0,
  });

  // 모달 키 관리
  const [Id, setId] = useState(0);

  // 모달 버튼 관리
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // useEffect(() => {
  //   console.log("버튼 비활성화: ", buttonDisabled);
  // }, [buttonDisabled]);

  const showModal = (data) => {
    if (data.waiting === 0) setButtonDisabled(true);
    setModalData(data);
    setIsModalVisible(true);
  };

  // const joinMatching = async () => {
  //   const response = await axios.post("https://e9c0c9c8-d370-456f-968f-03a3d0329c33.mock.pstmn.io/matching/10/follower", { id: Id });
  //   console.log("send data: ", { id: Id });
  //   console.log("response: ", response, "response.data.success: ", response.data.success);
  //   const isSuccess = response.data.success;
  //   // if (response.data.success) return true;
  //   // else return false;
  //   return isSuccess;
  // };

  const handleOk = async () => {
    console.log("매칭 신청: ", { id: Id });
    // console.log(matchingList);

    // 매칭 신청 요청 보내기
    // const res = joinMatching();
    const response = await axios.post(`/api/matching/${Id}/join/`);
    if (response.data.success) {
      message.success("신청 완료!");
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    } else {
      message.error(response.data.errorMessage);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [matchingList, setMatchingList] = useState([]);

  const fetchMatchingList = async () => {
    const response = await axios.get("/api/matzip/now/");
    setMatchingList(response.data.matchingList);
    console.log("main page response: ", response);
  };

  useEffect(() => {
    fetchMatchingList();
  }, []);

  matchingList.forEach((m) => {
    if (m.waiting === 0) m.tags = [];
    else {
      m.tags = [
        ...new Set(
          m.matchings.reduce((acc, cur) => {
            acc.push(...cur.tags);
            return acc;
          }, [])
        ),
      ];
    }
  });

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
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

  const majors = [
    "AI학과",
    "간호학과",
    "건축학부",
    "경영학부",
    "경제학부",
    "공공인재학부",
    "공연영상창작학부(서울)",
    "공연영상창작학부(안성)",
    "광고홍보학과",
    "교육학과",
    "국어국문학과",
    "국제물류학과",
    "글로벌예술학부",
    "기계공학부",
    "도시계획·부동산학과",
    "디자인학부",
    "문헌정보학과",
    "물리학과",
    "미디어커뮤니케이션학부",
    "미술학부",
    "사회기반시스템공학부",
    "사회복지학부",
    "사회학과",
    "산업보안학과",
    "생명과학과",
    "생명자원공학부",
    "소프트웨어학부",
    "수학과",
    "스포츠과학부",
    "시스템생명공학과",
    "식품공학부",
    "심리학과",
    "아시아문화학부",
    "약학부",
    "에너지시스템공학부",
    "역사학과",
    "영어교육과",
    "영어영문학과",
    "예술공학부",
    "유럽문화학부",
    "유아교육과",
    "융합공학부",
    "음악학부",
    "응용통계학과",
    "의학부",
    "전자전기공학부",
    "전통예술학부",
    "정치국제학과",
    "지식경영학부",
    "차세대반도체학과",
    "철학과",
    "첨단소재공학과",
    "체육교육과",
    "화학과",
    "화학신소재공학부",
  ];
  // 테이블 데이터
  const columns = [
    {
      title: "맛집",
      dataIndex: "name",
      key: "name",
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
    {
      title: "매칭 조건",
      key: "tags",
      dataIndex: "tags",
      filters: [
        {
          text: "성별",
          value: "성별",
          children: [
            {
              text: "여성",
              value: "F",
            },
            {
              text: "남성",
              value: "M",
            },
            {
              text: "성별 무관",
              value: "X",
            },
          ],
        },
        {
          text: "학과",
          value: "학과",
          children: majors.map((m) => ({ text: m, value: m })),
        },
        // [
        //   {
        //     text: "경영학과",
        //     value: "경영학과",
        //   },
        //   {
        //     text: "광고홍보학과",
        //     value: "광고홍보학과",
        //   },
        //   {
        //     text: "경제학과",
        //     value: "경제학과",
        //   },
        //   {
        //     text: "기계공학과",
        //     value: "기계공학과",
        //   },
        //   {
        //     text: "국제물류학과",
        //     value: "국제물류학과",
        //   },
        //   {
        //     text: "응용통계학과",
        //     value: "응용통계학과",
        //   },
        //   {
        //     text: "산업보안학과",
        //     value: "산업보안학과",
        //   },
        //   {
        //     text: "소프트웨어학과",
        //     value: "소프트웨어학과",
        //   },
        //   {
        //     text: "모든 학과",
        //     value: "모든 학과",
        //   },
        // ],
        {
          text: "만남 모드",
          value: "만남 모드",
          children: [
            {
              text: "밥만 먹어요",
              value: true,
            },
            {
              text: "우리 친해져요",
              value: false,
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
            let text = tag;

            if (tag === "모든 학과") {
              color = "gold";
            }

            if (tag === "F") {
              color = "volcano";
              text = "여성";
            }
            if (tag === "M") {
              color = "orange";
              text = "남성";
            }
            if (tag === "X") {
              color = "purple";
              text = "성별 무관";
            }

            if (tag === true) {
              color = "cyan";
              text = "우리 친해져요";
            }

            if (tag === false) {
              color = "lime";
              text = "밥만 먹어요";
            }

            return (
              <Tag color={color} key={tag}>
                {/* {tag.toUpperCase()} */}
                {text}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "매칭 신청",
      key: "action",
      render: (data) => (
        <Space>
          <Button onClick={() => showModal(data)}>신청하기😋</Button>
        </Space>
      ),
      width: "150px",
      align: "center",
    },
  ];

  // 맛칭 데이터(테스트)
  const testData = [
    {
      name: "우뇽파스타",
      waiting: 2,
      matchings: [
        {
          tags: ["여성", "산업보안학과", "우리 친해져요"],
          startTime: "2022-09-06 16:00",
          endTime: "2022-09-06 18:00",
          duration: "2시간",
          description:
            "뚝배기 파스타가 유명한 집입니다. 무료로 양 추가 할 수 있어요~!",
          max: 5,
          id: 1,
          follower: ["영갬", "오구"],
        },
        {
          tags: ["여성", "산업보안학과", "밥만 먹어요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "같이 가요~",
          max: 3,
          id: 2,
          follower: ["밈갬", "영갬"],
        },
      ],
    },
    {
      name: "북촌순두부",
      waiting: 1,
      matchings: [
        {
          tags: ["남성", "경영학과", "밥만 먹어요"],
          startTime: "2022-08-10 15:00",
          endTime: "2022-08-10 18:00",
          duration: "3시간",
          description: "햄치즈 순두부 맛집",
          max: 4,
          id: 3,
          follower: ["밈", "영", "구"],
        },
      ],
    },
    {
      name: "카우버거",
      waiting: 5,
      matchings: [
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 4,
          follower: ["밈갬"],
        },
        {
          tags: ["여성", "모든 학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "",
          max: 2,
          id: 5,
          follower: [],
        },
        {
          tags: ["남성", "소프트웨어학과", "밥만 먹어요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "배고파요",
          max: 3,
          id: 6,
          follower: ["밈갬"],
        },
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "카벅",
          max: 2,
          id: 7,
          follower: [],
        },
        {
          tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 8,
          follower: ["밈갬"],
        },
      ],
    },
    {
      name: "라이스&포테이토",
      waiting: 1,
      matchings: [
        {
          tags: ["성별 무관", "산업보안학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 9,
          follower: ["밈갬"],
        },
      ],
    },
    {
      name: "장독대",
      waiting: 1,
      matchings: [
        {
          tags: ["성별 무관", "국제물류학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 10,
          follower: ["밈갬"],
        },
      ],
    },
    {
      name: "인근주민",
      waiting: 1,
      matchings: [
        {
          tags: ["여성", "모든 학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 11,
          follower: ["밈갬"],
        },
      ],
    },
    {
      name: "엉터리생고기",
      waiting: 1,
      matchings: [
        {
          tags: ["남성", "기계공학과", "우리 친해져요"],
          startTime: "2022-08-10 16:00",
          endTime: "2022-08-10 18:00",
          duration: "2시간",
          description: "친구를 사귀고 싶어요ㅠㅠ",
          max: 3,
          id: 12,
          follower: ["밈갬"],
        },
      ],
    },
    {
      name: "중대양곱창",
      waiting: 0,
      matchings: [
        {
          id: 0,
        },
      ],
    },
  ];
  testData.forEach((m) => {
    if (m.waiting === 0) m.tags = [];
    else {
      m.tags = [
        ...new Set(
          m.matchings.reduce((acc, cur) => {
            acc.push(...cur.tags);
            return acc;
          }, [])
        ),
      ];
    }
  });

  // 맛칭 데이터 postman test
  //   const test = [
  //     {
  //       "name": "우뇽파스타",
  //       "waiting": 2,
  //       "matchings": [
  //         {
  //           tags: ["여성", "산업보안학과", "우리 친해져요"],
  //           startTime: "2022-08-10 16:00",
  //           endTime: "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "여기 맛있어요!",
  //           "max": 5,
  //           id: 1,
  //           "follower": ["밈갬", "영갬", "오구"]
  //         },
  //         {
  //           "tags": ["여성", "산업보안학과", "밥만 먹어요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "같이 가요~",
  //           "max": 3,
  //           "id": 2,
  //           "follower": ["밈갬", "영갬"],
  //         },
  //       ],
  //     },
  //     {
  //       "name": "북촌순두부",
  //       "waiting": 1,
  //       "matchings": [
  //         {
  //           "tags": ["남성", "경영학과", "밥만 먹어요"],
  //           "startTime": "2022-08-10 15:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "3시간",
  //           "description": "햄치즈 순두부 맛집",
  //           "max": 4,
  //           "id": 3,
  //           "follower": ["밈", "영", "구"],
  //         }
  //       ]
  //     },
  //     {
  //       "name": "카우버거",
  //       "waiting": 5,
  //       "matchings": [
  //         {
  //           "tags": ["성별 무관", "소프트웨어학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 4,
  //           "follower": ["밈갬"],
  //         },
  //         {
  //           "tags": ["여성", "모든 학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "",
  //           "max": 2,
  //           "id": 5,
  //           "follower": [],
  //         },
  //         {
  //           "tags": ["남성", "소프트웨어학과", "밥만 먹어요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "배고파요",
  //           "max": 3,
  //           "id": 6,
  //           "follower": ["밈갬"]
  //         },
  //         {
  //           "tags": ["성별 무관", "소프트웨어학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "카벅",
  //           "max": 2,
  //           "id": 7,
  //           "follower": []
  //         },
  //         {
  //           "tags": ["성별 무관", "소프트웨어학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 8,
  //           "follower": ["밈갬"]
  //         }
  //       ]
  //     },
  //     {
  //       "name": "라이스&포테이토",
  //       "waiting": 1,
  //       "matchings": [
  //         {
  //           "tags": ["성별 무관", "산업보안학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 9,
  //           "follower": ["밈갬"]
  //         }
  //       ]
  //     },
  //     {
  //       "name": "장독대",
  //       "waiting": 1,
  //       "matchings": [
  //         {
  //           "tags": ["성별 무관", "국제물류학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 10,
  //           "follower": ["밈갬"],
  //         }
  //       ]
  //     },
  //     {
  //       "name": "인근주민",
  //       "waiting": 1,
  //       "matchings": [
  //         {
  //           "tags": ["여성", "모든 학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 11,
  //           "follower": ["밈갬"]
  //         }
  //       ]
  //     },
  //     {
  //       "name": "엉터리생고기",
  //       "waiting": 1,
  //       "matchings": [
  //         {
  //           "tags": ["남성", "기계공학과", "우리 친해져요"],
  //           "startTime": "2022-08-10 16:00",
  //           "endTime": "2022-08-10 18:00",
  //           "duration": "2시간",
  //           "description": "친구를 사귀고 싶어요ㅠㅠ",
  //           "max": 3,
  //           "id": 12,
  //           "follower": ["밈갬"]
  //         }
  //       ]
  //     },
  //     {
  //       "name": "중대양곱창",
  //       "waiting": 0,
  //       "matchings": [{ "id": 0 }]
  //     }
  // ]

  // 데이터 태그 초기화
  // data.forEach((data) => {
  //   if (data.waiting === 0) data.tags = [];
  //   else {
  //     data.tags = [
  //       ...new Set(
  //         data.matchings.reduce((acc, cur) => {
  //           acc.push(...cur.tags);
  //           return acc;
  //         }, [])
  //       ),
  //     ];
  //   }
  // });

  return (
    <div className={styles.container}>
      <Button onClick={async () => {}}>API Test!</Button>
      <h1>
        <span>대</span>
        <span>기</span>
        <span>중</span>
        <span>인</span>
        <span>&nbsp;</span>
        <span>맛</span>
        <span>칭</span>
        <span>!</span>
      </h1>
      <div className={styles.table_container}>
        <Table
          scroll={{ y: "65vh" }}
          pagination={false}
          columns={columns}
          dataSource={matchingList}
          className={styles.table}
        />
      </div>
      <Modal
        title="매칭 신청"
        cancelText="취소"
        okText="신청하기"
        okButtonProps={{ disabled: buttonDisabled }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered="true"
        width="80%"
        className={styles.modal}
      >
        <DetailPage
          data={modalData}
          setId={setId}
          setButtonDisabled={setButtonDisabled}
        />
      </Modal>
    </div>
  );
}

export default MainPage;
