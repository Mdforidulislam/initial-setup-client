import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, FacebookOutlined, SkypeOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";



const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const SignIn: React.FC = () => {

  const onFinish = async (values: any) => {
    console.log("User data before sending:", values); // Log before sending
    try {

    } catch (err) {
        console.error("Failed to create user:", err);
    }
};



  return (
    <div className="flex justify-center items-center w-full h-screen p-4 bg-gray-100">
      <Form
        name="signin-form"
        onFinish={onFinish}
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        validateMessages={validateMessages}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          Sign In
        </h2>

        <Form.Item
          name="user_Name"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username *" />
        </Form.Item>

        <Form.Item
          name="user_Id"
          rules={[{ required: true, message: "User ID is required" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="User ID *" />
        </Form.Item>

        <Form.Item
          name="user_Email"
          rules={[{ type: "email", required: true, message: "Valid email is required" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email *" />
        </Form.Item>

        <Form.Item
          name="user_password"
          rules={[
              {
                  required: true, 
                  message: "Strong password is required",
              },
              {
                  min: 8, 
                  message: "Password must be at least 8 characters long",
              },
           ]}
        >
            <Input
                prefix={<LockOutlined />} 
                type="password" 
                placeholder="Password is Required *"
            />
        </Form.Item>


        <Form.Item
          name="user_PhoneNumber"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number *" />
        </Form.Item>

        <Form.Item
          name="user_Skype_Profile_url"
          rules={[{ required: true, message: "Skype profile URL is required" }]}
        >
          <Input prefix={<SkypeOutlined />} placeholder="Skype Profile URL *" />
        </Form.Item>

        <Form.Item
          name="user_Facebook_Profile_url"
          rules={[{ required: true, message: "Facebook profile URL is required" }]}
        >
          <Input prefix={<FacebookOutlined />} placeholder="Facebook Profile URL *" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Form.Item>
        <p>
          Already Signed In? <Link to={'/login'}><span className="text-green-600">Click Here</span></Link>
        </p>
      </Form>
    </div>
  );
};

export default SignIn;
