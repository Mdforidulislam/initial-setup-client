import UserDashboard from "../Dashboard/UserDashoboard/UserDashboard";
import Home from "../Pages/Users/Home/Home";
import Shortener from "../Pages/Users/Shortener/Shortener";
import TgSupport from "../Pages/Users/TgSupport/TgSupport";
import Screenshot from "../Pages/Users/Screenshot/Screenshot";
import ProtectedRoute from "../PrivetRoutes/ProtectedRoute";
import Video from "../Pages/Users/Video/Video";
import Purchase from "../Pages/Users/Purchase/Purchase";
import TempMainl from "../Pages/Users/TempMail/TempMainl";
import LiveChate from "../Pages/Users/LiveChat/LiveChate";
import BuySell from "../Pages/Users/BuySell/BuySell";



const UserRoutes = [

    {
        path: "/dashboard/user",
        element: <ProtectedRoute requiredRole='user'> <UserDashboard /></ProtectedRoute>, 
        children: [
            {
                index: true, 
                element: <Home />, 
            },
            {
                path:"shortener",
                element: <Shortener/>
            },
            {
                path:"tg-support",
                element:<TgSupport/>
            },
            {
                path:"screenshort",
                element:<Screenshot/>
            },
            {
                path:"video-verify",
                element:<Video/>
            },
            {
                path:"purchase",
                element:<Purchase/>
            },
            {
                path:"buy-sell",
                element:<BuySell/>
            },
            {
                path:"temp-mail",
                element:<TempMainl/>
            },
            {
                path:"live-chat",
                element:<LiveChate/>
            },
        ],
    },
];

export default UserRoutes; 