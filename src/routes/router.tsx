import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import HomeLayout from "@/layouts/HomeLayout";
import Profile from "@/tabs/Profile";
import Dashboard from "@/tabs/Dashboard";
import Transactions from "@/tabs/Transactions";
import Accounts from "@/tabs/Accounts";
import ProfileEditForm from "@/tabs/ProfileEdit";
import TransactionDetail from "@/tabs/TransactionDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoute />,
        errorElement: <NotFound />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/home",
        element: <HomeLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/home/profile",
                element: <Profile />,
            },
            {
                path: "/home/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/home/transactions",
                element: <Transactions />,
            },
            {
                path: "/home/accounts",
                element: <Accounts />,
            },
            {
                path: "/home/profile-edit",
                element: <ProfileEditForm />,
            },
            {
                path: "/home/transactions/:id",
                element: <TransactionDetail />,
            }
        ],
    },
]);

export default router;
