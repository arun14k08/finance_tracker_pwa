import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import HomeLayout from "@/layouts/HomeLayout";

const router = createBrowserRouter([
   {
    path: "/",
    element: <PublicRoute/>,
    errorElement: <NotFound/>,
    children: [
        {
            path: "login",
            element: <Login/>
        },
        {
            path: "register",
            element: <Register/>
        }
    ]
    },
    {
        path: "/home",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "",
                element: <HomeLayout/>,
            }
        ]
    }
]);

export default router;
