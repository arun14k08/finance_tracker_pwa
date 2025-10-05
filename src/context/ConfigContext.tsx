import React, { createContext } from 'react'

type Config = {
    baseUrl: string
    apiUrl: string;
    appName: string;
    env: string;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config] = React.useState<Config>({
        baseUrl : import.meta.env.VITE_BASE_URL,
        apiUrl : import.meta.env.VITE_API_URL,
        appName: import.meta.env.VITE_APP_NAME,
        env: import.meta.env.VITE_ENV
    });

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigContext;