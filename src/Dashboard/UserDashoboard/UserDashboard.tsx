import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,

} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet,  useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { clearAuth } from '../../Redux/Features/User/authSlice';


const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const LogOutDispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle click for Logout User
  const logOutHandle = async () => {
    try {
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
