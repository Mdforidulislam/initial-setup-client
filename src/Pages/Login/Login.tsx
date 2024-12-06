import React from "react";
import { Button, Form, Input } from "antd";
import { Link , useNavigate} from "react-router-dom";
import { useLoginUserMutation } from "../../Redux/Features/Api/userApi";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useAppDispatch } from "../../Redux/hooks/hooks";
import { setAuth } from "../../Redux/Features/User/authSlice";

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
  const [loginUser] =  useLoginUserMutation();

  const onFinish = async (values: any) => {
    try {
      const userLogin = await loginUser(values).unwrap(); 
      if (userLogin?.data?.accessToken ) {
        const decodedToken = jwtDecode<CustomJwtPayload>(userLogin.data.accessToken);
        console.log(decodedToken,'check the token')
        const userRole = decodedToken.user_role;
        const user_Name = decodedToken.user_Name;

        dispatchLogin(setAuth({ token: userLogin.data.accessToken, userRole , user_Name}));

        if (userRole === 'admin') {
          navigate('/dashboard/admin');
        } else if (userRole  === 'user') {
          navigate('/dashboard/user');
        } else {
          console.error('Unknown user role');
        }
      } else {
        console.error('No access token found');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  



 return(
  <div className="flex justify-center items-center w-full h-screen p-4 bg-gray-100">
  <Form
    name="login-form"
    onFinish={onFinish}
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
