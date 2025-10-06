import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "./context/ConfigContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CacheProvider } from "./context/LocalCacheContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <ConfigProvider>
                <CacheProvider>
                    <App />
                </CacheProvider>
            </ConfigProvider>
        </AuthProvider>
    </StrictMode>
);
