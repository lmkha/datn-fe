'use client';

import React, { createContext, useReducer, ReactNode, useContext } from "react";

// Define the shape of the User state
interface UserState {
    userId: string | null;
    username: string | null;
    token: string | null;
}

// Define the types of actions
type UserAction =
    | { type: "SET_USER"; payload: { userId: string; username: string; token: string } }
    | { type: "CLEAR_USER" };

// Define the initial state
const initialUserState: UserState = {
    userId: null,
    username: 'lmkha',
    token: null,
};

// Define the reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
                token: action.payload.token,
            };
        case "CLEAR_USER":
            return {
                ...state,
                userId: null,
                username: null,
                token: null,
            };
        default:
            return state;
    }
};

// Define the context type
interface UserContextProps {
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useUserContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
