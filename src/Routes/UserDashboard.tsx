import UserDashboard from "../Dashboard/UserDashoboard/UserDashboard";
import Home from "../Pages/Users/Home/Home";
import ProtectedRoute from "../PrivetRoutes/ProtectedRoute";




const UserRoutes = [

    {
        path: "/dashboard/user",
        element: <ProtectedRoute > <UserDashboard /></ProtectedRoute>, 
        children: [
            {
                index: true, 
                element: <Home />, 
            },
        
        ],
    },
];

export default UserRoutes; 