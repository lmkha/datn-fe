import React, { createContext, ReactNode, useContext } from "react";

interface AppContextType {

}

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <appContext.Provider value={{

        }}>
            {children}
        </appContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(appContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
};
