import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";


export default function BuySell() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (

    <div className="h-full bg-gray-100 p-6 relative">
      
              <div>
              <Tabs
                defaultActiveKey="1"
                type="card"
                items={new Array(3).fill(null).map((_, i) => {
                  const id = String(i + 1);
                  return {
                    label: `Card Tab ${id}`,
                    key: id,
                    children: `Content of card tab ${id}`,
                  };
                })}
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {
                  [1,2,3,4,5,6,7,8].map((index)=>(
                    <div key={index}>
                       <Card
                        style={{ width: 300 }}
                        onMouseEnter={showModal}
                        cover={
                          <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                        actions={[
                          <SettingOutlined key="setting" />,
                          <EditOutlined key="edit" />,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                        <Meta
                          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                          title="Card title"
                          description="This is the description"
                        />
                      </Card>
                    </div>
                  ))
                }
             </div>


      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
