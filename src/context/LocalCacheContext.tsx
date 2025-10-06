import type { Account } from "@/lib/mock-data";
import React, { createContext, useState, useEffect, useCallback } from "react";

type CacheType = {
    accounts: Account[];
};

type CacheContextType = {
    cache: CacheType;
    setCache: React.Dispatch<React.SetStateAction<CacheType>>;
    clearCache: () => void;
};

const CacheContext = createContext<CacheContextType | null>(null);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const CACHE_KEY = "app_cache";

    // Load initial cache from sessionStorage or fallback
    const [cache, setCache] = useState<CacheType>(() => {
        const stored = sessionStorage.getItem(CACHE_KEY);
        return stored
            ? JSON.parse(stored)
            : {
                  accounts: [],
              };
    });

    // Whenever cache changes, sync it to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }, [cache]);

    // Method to clear cache both in state and sessionStorage
    const clearCache = useCallback(() => {
        sessionStorage.removeItem(CACHE_KEY);
        setCache({ accounts: [] });
    }, []);

    return (
        <CacheContext.Provider value={{ cache, setCache, clearCache }}>
            {children}
        </CacheContext.Provider>
    );
};

export default CacheContext;
