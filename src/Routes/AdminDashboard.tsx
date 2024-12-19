import {  Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashobard";
import Home from "../Pages/Admin/Home/Home";
import Payment from "../Pages/Admin/Payment/Payment";
import SignIn from "../Pages/SingIn/SingIn";
import ProtectedRouteAdmin from "../PrivetRoutes/ProtectedRoute";
import UnAuthorized from "../Pages/Unauthorized/UnAuthorized";


const Adminroutes = [
    {
        path: "/",
        element: <Navigate to="/login" replace={true} />, 
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/singin",
        element: <SignIn/>
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized/>
    },
    {
        path: "/dashboard/admin",
        element: <ProtectedRouteAdmin requiredRole="admin"><AdminDashboard /></ProtectedRouteAdmin>, 
        children: [
            {
                index: true, 
                element: <Home />, 
            },
            {
                path:"payment",
                element: <Payment/>
            },
        ],
    },
];

export default Adminroutes; 
