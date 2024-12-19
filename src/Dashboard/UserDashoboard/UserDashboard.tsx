import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks/hooks";
import { clearAuth } from "../../Redux/Features/User/authSlice";
import { RiMenuFold4Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const LogOutDispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logOutHandle = async () => {
    try {
      LogOutDispatch(clearAuth());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Layout style={{ height: "auto" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsedState) => setCollapsed(collapsedState)}
        style={{
          background: colorBgContainer,
          borderRight: "1px solid #e0e0e0",
        }}
        collapsedWidth="60"
        trigger={null}
      >
        <div className={`${collapsed? 'justify-end' : 'justify-between'} flex items-center`}>
          <div className={`pl-2 ${collapsed? 'hidden' : 'flex'} font-bold`}>User</div>
          <Button
            type="text"
            icon={
              collapsed ? (
                <RiMenuFold4Fill className="text-xl font-bold" />
              ) : (
                <RxCross2 className="text-xl" />
              )
            }
            onClick={toggleCollapse}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: "18px",
              marginLeft: "15px",
            }}
          >
            Dashboard
          </div>
          <div style={{ marginRight: "15px" }}>
            <Button type="primary" onClick={logOutHandle}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
