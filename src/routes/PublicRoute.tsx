import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const auth = useContext(AuthContext);
    if (auth?.user && auth?.user.token) {
        return <Navigate to="/home/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
