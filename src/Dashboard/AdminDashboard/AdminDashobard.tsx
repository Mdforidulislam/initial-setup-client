
import {
  TagsFilled,
  UserOutlined,

} from '@ant-design/icons';
import { Button, Layout, Menu,  } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';


import { MdPayment } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {



  return (
    <Layout style={{ height: '100vh', border: '1px solid #e0e0e0', backgroundColor: "#F5F5F5" }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
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
              label: <Link to="/dashboard/admin">Dashboard</Link>,
            },
            {
              key: '3',
              icon: <MdPayment />,
              label: <Link to="/dashboard/admin/payment">Payment Aprove</Link>,
            },
            {
              key: '4',
              icon: <TagsFilled />,
              label: <Link to="/dashboard/admin/tg-support">Tg support </Link>,
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Button
            type="text"
         
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

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,

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
