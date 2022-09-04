import { HomeOutlined, LoginOutlined, LogoutOutlined, ClockCircleOutlined, PlusCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
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
import AuthFailedPage from "./components/AuthFailedPage/AuthFailedPage";

import axios from "axios";

import styles from "./App.module.css";
import Logo from "./Logo.jpg";
import newLogo from "./newLogo.png";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  axios.defaults.withCredentials = true;

  const [login, setLogin] = useState(true);
  const fetchLogin = async () => {
    const response = await axios.get("/api/account/login_check/");
    console.log("login check response: ", response);
    if (response.data.success) {
      setLogin(true);
    }
  };

  useEffect(() => {
    fetchLogin();
  }, []);

  const logout = async () => {
    const response = await axios.post("/api/account/logout/");
    if (response.data.success) {
      message.success("로그아웃 완료");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error(response.data.errorMessage);
    }
  };

  return (
    <Router>
      <Layout className={styles.font}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" style={{ backgroundColor: "rgb(110,165,254)" }}>
          <Link to="/">
            <img src={newLogo} className={styles.logo} />
          </Link>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["main"]} style={{ backgroundColor: "rgb(110,165,254)", color: "white", fontSize: "20px" }}>
            <Menu.Item key="main" icon={<HomeOutlined />}>
              <Link to="/" className={styles.menu_link}>
                메인 페이지
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
            {login ? (
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <div onClick={logout} className={styles.menu_link}>
                  로그아웃
                </div>
              </Menu.Item>
            ) : (
              <Menu.Item key="login" icon={<LoginOutlined />}>
                <Link to="/login" className={styles.menu_link}>
                  로그인
                </Link>
              </Menu.Item>
            )}
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
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route path="/register" element={login ? <RegisterPage /> : <AuthFailedPage />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/mymatching" element={login ? <MyMatchingPage /> : <AuthFailedPage />} />
              <Route path="/newmatching" element={login ? <NewMatchingPage /> : <AuthFailedPage />} />
              <Route path="/authfailed" element={<AuthFailedPage />} />
            </Routes>
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
