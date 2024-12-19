import React from "react";
import { Button, Form, Input } from "antd";
import { Link , useNavigate} from "react-router-dom";
import { JwtPayload } from 'jwt-decode';
import { useAppDispatch } from "../../Redux/hooks/hooks";


const validateMessages = {
  required: "${label} is required!",
};

// Define your custom interface extending JwtPayload
interface CustomJwtPayload extends JwtPayload {
  user_role: string; 
  user_Name: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatchLogin = useAppDispatch();


  


 return(
  <div className="flex justify-center items-center w-full h-screen p-4 bg-gray-100">
  <Form
    name="login-form"
    style={{
      width: "100%",
      maxWidth: 400,
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
    validateMessages={validateMessages}
  >
    <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>

    <Form.Item
      name="usernameOrEmail"
      rules={[{ required: true, message: "Please input your username or email!" }]}
    >
      <Input placeholder="Username or Email" />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password placeholder="Password" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Login
      </Button>
    </Form.Item>
    <p>Singin  <Link to={'/singin'}><span className="text-green-600">Click Here</span></Link></p>
  </Form>
</div>
 )
};

export default Login;
