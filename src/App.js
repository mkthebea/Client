import { LoginOutlined, ClockCircleOutlined, PlusCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.min.css";
import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPage from "./components/DetailPage/DetailPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import MyMatchingPage from "./components/MyMatchingPage/MyMatchingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import SignupPage from "./components/SignupPage/SignupPage";
import SignupSuccessPage from "./components/SignupPage/SignupSuccessPage";
import NewMatchingPage from "./components/NewMatchingPage/NewMatchingPage";
import styles from "./App.module.css";
import Logo from "./Logo.jpg";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <Layout className={styles.font}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ backgroundColor: "rgb(110,165,254)" }}>
          <Link to="/">
            <img src={Logo} className={styles.logo} />
          </Link>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} style={{ backgroundColor: "rgb(110,165,254)", color: "white", fontSize: "20px" }}>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login" className={styles.menu_link}>
                로그인
              </Link>
            </Menu.Item>
            <Menu.Item key="mymatching" icon={<ClockCircleOutlined />}>
              <Link to="/mymatching" className={styles.menu_link}>
                내 맛칭
              </Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<PlusCircleOutlined />}>
              <Link to="/register" className={styles.menu_link}>
                맛집 등록
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            // className="site-layout-background"
            className={styles.header}
          >
            <div style={{ color: "rgb(110,165,254)" }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            {/* <Link to="/">
              <span style={{ color: "red", fontSize: "30px" }}>맛</span>집 매<span style={{ color: "blue", fontSize: "30px" }}>칭</span>은, <span style={{ fontSize: "30px" }}>맛칭!</span>
            </Link> */}
            <div className={styles.food_container}>
              <div className={styles.text}>맛집 매칭은, 맛칭!&nbsp;&nbsp;&nbsp;</div>
              <div className={styles.food}>🍔</div>
              <div className={styles.food2}>🍜</div>
              <div className={styles.food}>🍕</div>
              <div className={styles.food2}>🥗</div>
              <div className={styles.food}>🍦</div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              // margin: "24px 16px",
              height: "90vh",
              // padding: 24,
              minHeight: 280,
              backgroundColor: "rgb(110,165,254,0.3)",
              // textAlign: "center",
              padding: 24,
            }}
          >
            {/* <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
                backgroundColor: "rgb(70, 130, 180, 0)",
              }}
            > */}
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/mymatching" element={<MyMatchingPage />} />
              <Route path="/newmatching" element={<NewMatchingPage />} />
            </Routes>
            {/* </div> */}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              // backgroundColor: "rgb(70, 130, 180, 0.5)",
            }}
          >
            MatChing ©2022 Created by SanSuO
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
