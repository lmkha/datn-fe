'use client';

import React, { createContext, useState, ReactNode, useContext } from "react";

type Severity = 'error' | 'info' | 'success' | 'warning';

interface AlertState {
    text: string;
    severity: Severity;
    isOpen: boolean;
}

interface AppState {
    theme: "light" | "dark";
    language: "en" | "vi";
}

interface AppContextProps {
    state: AppState;
    alertState: AlertState;
    setTheme: (theme: "light" | "dark") => void;
    setLanguage: (language: "en" | "vi") => void;
    showAlert: ({ message, severity }: { message: string, severity: Severity }) => void;
    hideAlert: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        theme: "light",
        language: "en",
    });

    const [alertState, setAlertState] = useState<AlertState>({
        text: '',
        severity: 'info',
        isOpen: false,
    });

    // Functions to update app state
    const setTheme = (theme: "light" | "dark") => {
        setState((prev) => ({ ...prev, theme }));
    };

    const setLanguage = (language: "en" | "vi") => {
        setState((prev) => ({ ...prev, language }));
    };

    // Functions to manage Alert
    const showAlert = ({ message, severity }: { message: string, severity: Severity }) => {
        setAlertState((prev) => ({ ...prev, text: message, severity, isOpen: true }));
    };

    const hideAlert = () => {
        setAlertState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <AppContext.Provider value={{ state, alertState, setTheme, setLanguage, showAlert, hideAlert }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
