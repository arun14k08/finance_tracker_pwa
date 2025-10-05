import AuthContext from "@/context/AuthContext";
import { useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute : React.FC = ({ children }) => {
    const auth = useContext(AuthContext);

    if (!auth?.user || !auth?.user.token) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
