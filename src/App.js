import {
  ClockCircleOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import "antd/dist/antd.min.css";
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthFailedPage from "./components/AuthFailedPage/AuthFailedPage";
import DetailPage from "./components/DetailPage/DetailPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import MyMatchingPage from "./components/MyMatchingPage/MyMatchingPage";
import NewMatchingPage from "./components/NewMatchingPage/NewMatchingPage";
import NotFound from "./components/NotFound/NotFound";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import SignupPage from "./components/SignupPage/SignupPage";
import SignupSuccessPage from "./components/SignupPage/SignupSuccessPage";

import axios from "axios";
import styles from "./App.module.css";
import { getUser } from "./firebase/auth/core";
import newLogo from "./newLogo.png";

import { logout as doLogout } from "./firebase/auth/core";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  axios.defaults.withCredentials = true;

  // 로그인 상태 확인
  const user = getUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user !== null);

  // 로그아웃
  const logout = async () => {
    await doLogout();

    // TODO : 로그아웃 실패 사유가 뭐가 있을까?
    if (true) {
      setIsLoggedIn(false);
      message.success("로그아웃 완료");
    }

    // if (response.data.success) {
    //   message.success("로그아웃 완료");
    //   setTimeout(() => {
    //     window.location.replace("/");
    //   }, 1000);
    // } else {
    //   message.error(response.data.errorMessage);
    // }
  };

  return (
    <Router>
      <Layout className={styles.font} on>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="dark"
          style={{ backgroundColor: "rgb(110,165,254)" }}
        >
          <Link to="/">
            <img src={newLogo} className={styles.logo} />
          </Link>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["main"]}
            style={{
              backgroundColor: "rgb(110,165,254)",
              color: "white",
              fontSize: "20px",
            }}
          >
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
            {isLoggedIn ? (
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
          <Header className={styles.header}>
            <div style={{ color: "rgb(110,165,254)" }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
            <div className={styles.food_container}>
              <div className={styles.text}>
                맛집 매칭은, 맛칭!&nbsp;&nbsp;&nbsp;
              </div>
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
              height: "90vh",
              minHeight: 280,
              backgroundColor: "rgb(110,165,254,0.3)",
              padding: 24,
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/login"
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route
                path="/register"
                element={isLoggedIn ? <RegisterPage /> : <AuthFailedPage />}
              />
              <Route path="/detail" element={<DetailPage />} />
              <Route
                path="/mymatching"
                element={isLoggedIn ? <MyMatchingPage /> : <AuthFailedPage />}
              />
              <Route
                path="/newmatching"
                element={isLoggedIn ? <NewMatchingPage /> : <AuthFailedPage />}
              />
              <Route path="/authfailed" element={<AuthFailedPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "center",
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
