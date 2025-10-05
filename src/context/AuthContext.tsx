import { createContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
    user: UserData;
    login: (userData: UserData) => void;
    logout: () => void;
    setUser: (userData: UserData) => void;
};

type UserData = {
    token: string;
    name: string;
    email: string;
} | null;

export const AuthProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);

    const login = (userData: UserData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData?.token || "");
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;