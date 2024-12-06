import  { useEffect, useState, useCallback } from "react";
import { Button, Form, Modal, Checkbox, Input, List, Avatar, message } from "antd";
import { FiCopy } from "react-icons/fi";
import {
  useDeletedLimitedDomainMutation,
  useGenerateDomainMutation,
  useListOfShortenerQuery,
  usePaymentShortenerMutation,
  useStatusGetDomainQuery,
} from "../../../Redux/Features/Api/shortener";
import { useAppSelector } from "../../../Redux/hooks/hooks";

type FieldType = {
  user_Name: string;
  serviceName?: string[];
  paymentAmount?: string;
};

export default function Shortener() {
  const { user_Name } = useAppSelector((state) => state.auth);

  const [mainDomain, setMainDomain] = useState("");
  const [userDomain, setUserDomain] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listItems, setListItems] = useState<{ _id: string; title: string; description: string }[]>([]);

  const { data: domains, isLoading: loadingDomains } = useStatusGetDomainQuery(user_Name || null);
  const { data: shortenerList, isLoading: loadingShorteners } = useListOfShortenerQuery({ user_Name, mainDomain });

  const [generateDomain] = useGenerateDomainMutation();
  const [submitPayment] = usePaymentShortenerMutation();
  const [deletedInfo] = useDeletedLimitedDomainMutation();

  useEffect(() => {
    if (domains?.data?.length === 0) {
      setIsModalOpen(false);
    }
  }, [domains]);

  useEffect(() => {
    if (shortenerList) {
      // Ensure data is correctly mapped
      const formattedList = shortenerList?.data?.map((item: any) => ({
        _id: item._id,
        title: item.title || `Shortened Link for ${item.originalLink}`,
        description: item.shortenedLink,
      }));
      setListItems(formattedList);
    }
  }, [shortenerList]);

  const handleGenerateLink = async () => {
    try {
      const { data } = await generateDomain({ mainDomain, userDomain, user_Name }).unwrap();
      setShortenedLink(data);
      message.success("Shortened link generated!");
    } catch (error) {
      console.error("Error generating link:", error);
      message.error("Failed to generate shortened link. Please try again.");
    }
  };

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shortenedLink);
    message.success("Link copied to clipboard!");
  }, [shortenedLink]);

  const handleFormSubmit = async (values: FieldType) => {
    try {
      await submitPayment({ ...values, user_Name });
      message.success("Payment submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Payment submission failed:", error);
      message.error("Failed to submit payment. Please try again.");
    }
  };



  const handleDeleteItem = useCallback(
    async (id: string) => {
      try {
     const respone =    await deletedInfo({ id }).unwrap();
     console.log(respone)
      
        setListItems((prevItems) => prevItems.filter((item) => item._id !== id));
        
        message.success("Domain deleted successfully!");
      } catch (error) {

        console.error("Error deleting domain:", error);
        message.error("Failed to delete domain. Please try again.");
      }
    },
    [deletedInfo, setListItems] 
  );

  const renderShortenedLink = () =>
    shortenedLink && (
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex justify-between items-center">
        <div className="flex-1">
          <p className="text-gray-700 font-medium">Shortened Link:</p>
          <a
            href={shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 break-all"
          >
            {shortenedLink}
          </a>
        </div>
        <button
          onClick={handleCopyLink}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg flex items-center"
        >
          <FiCopy className="mr-1" /> Copy
        </button>
      </div>
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-full justify-between">
        {/* Shortener Section */}
        <div className="flex-1 max-w-lg mx-auto lg:mx-0 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">URL Shortener</h1>

          {/* Domain Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Domain</label>
            <select
              value={mainDomain}
              onChange={(e) => setMainDomain(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              {loadingDomains ? (
                <option>Loading...</option>
              ) : (
                domains?.data?.map((item: string, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Original Link Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Enter Link to Shorten</label>
            <input
              type="text"
              value={userDomain}
              onChange={(e) => setUserDomain(e.target.value)}
              placeholder="Paste your link here"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Generate Link Button */}
          <button
            onClick={handleGenerateLink}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 mb-6"
            disabled={!userDomain || loadingShorteners}
          >
            {loadingShorteners ? "Generating..." : "Generate Short Link"}
          </button>

          {/* Shortened Link Display */}
          {renderShortenedLink()}
        </div>

        {/* Domain List Section */}
        <div className="flex-1 p-8">
          <h1 className="text-xl font-bold mb-4">Shortened Links List</h1>
          <List
            loading={loadingShorteners}
            itemLayout="horizontal"
            dataSource={listItems}
            locale={{ emptyText: "No shortened links available." }}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <Button type="link" danger onClick={() => handleDeleteItem(item._id)}>
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.title[0]}</Avatar>}
                  title={item.title}
                  description={<a href={item.description}>{item.description}</a>}
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal title="Payment Info" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form
          name="shortener-payment"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Service Name"
            name="serviceName"
            rules={[{ required: true, message: "Please select at least one service!" }]}
          >
            <Checkbox.Group>
              <Checkbox value="calling">Calling Payment</Checkbox>
              <Checkbox value="notice">Noticing Payment</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Payment Amount"
            name="paymentAmount"
            rules={[{ required: true, message: "Please input the payment amount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
