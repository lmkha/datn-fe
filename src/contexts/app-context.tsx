'use client';

import React, { createContext, useReducer, ReactNode, useContext } from "react";

// Define the shape of the App state
interface AppState {
    theme: "light" | "dark";
    language: "en" | "vi";
}

// Define the types of actions
type AppAction =
    | { type: "SET_THEME"; payload: "light" | "dark" }
    | { type: "SET_LANGUAGE"; payload: "en" | "vi" };

// Define the initial state
const initialAppState: AppState = {
    theme: "light",
    language: "en",
};

// Define the reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "SET_THEME":
            return { ...state, theme: action.payload };
        case "SET_LANGUAGE":
            return { ...state, language: action.payload };
        default:
            return state;
    }
};

// Define the context type
interface AppContextProps {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
