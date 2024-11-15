import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isLogged: boolean;
    login: () => void;
    logout: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <authContext.Provider value={{
            isLogged,
            login: () => setIsLogged(true),
            logout: () => setIsLogged(false)
        }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
};
