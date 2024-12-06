import React, { useState } from 'react';
import {
  FundProjectionScreenOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SlackSquareOutlined,
  TagsFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet,  useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { clearAuth } from '../../Redux/Features/User/authSlice';
import { useLogOutUserMutation } from '../../Redux/Features/Api/userApi';


const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [isLogOutUser] = useLogOutUserMutation();
  const LogOutDispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle click for Logout User
  const logOutHandle = async () => {
    try {
        const response = await isLogOutUser(undefined).unwrap(); 
        console.log("Logout successful:", response);
        LogOutDispatch(clearAuth()); 
        navigate("/login"); 
    } catch (error) {
        console.error("Logout failed:", error);
    }
};


  return (
    <Layout style={{ height: '100vh', border: '1px solid #e0e0e0', backgroundColor: "#F5F5F5" }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className="demo-logo-vertical"
          style={{
            textAlign: 'center',
            padding: '16px',
            color: 'white',
            fontSize: '24px',
          }}
        >
          <h1 style={{ color: "black" }}>User</h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to="/dashboard/user">Dashboard</Link>,
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to="/dashboard/user/shortener">Shortener</Link>,
            },
            {
              key: '4',
              icon: <TagsFilled />,
              label: <Link to="/dashboard/user/tg-support">Tg support </Link>,
            },
            {
              key: '5',
              icon: <FundProjectionScreenOutlined />,
              label: <Link to="/dashboard/user/screenshort">Screenshot </Link>,
            },
            {
              key: '6',
              icon: <VideoCameraOutlined />,
              label: <Link to="/dashboard/user/video-verify">Video verify </Link>,
            },
            {
              key: '8',
              icon: <SlackSquareOutlined />,
              label: <Link to="/dashboard/user/buy-sell">Buy Sell</Link>,
            },
            {
              key: '9',
              icon: <MailOutlined />,
              label: <Link to="/dashboard/user/temp-mail">Temp mail</Link>,
            },
            {
              key: '10',
              icon: <MessageOutlined />,
              label: <Link to="/dashboard/user/live-chat">Message</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
            User Dashboard
          </div>
          <div style={{marginRight: '15px'}}>
             <button onClick={logOutHandle}>LogOut</button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
