import React, { createContext, useReducer, ReactNode, useContext, useEffect } from "react";
import useLocalStorage, { get } from "@/hooks/use-local-storage";

// Define the shape of the User state
interface UserState {
    userId: string | null;
    username: string | null;
    email: string | null;
    fullName: string | null;
    phone: string | null;
    isPrivate: boolean | null;
    dateOfBirth: string | null;
    followingCount: number | null;
    followersCount: number | null;
    avatar: string | null;
}

// Define the types of actions
type UserAction =
    | { type: "SET_USER"; payload: Partial<UserState> }
    | { type: "CLEAR_USER" };

// Define the initial state
const initialUserState: UserState = {
    userId: null,
    username: null,
    email: null,
    fullName: null,
    phone: null,
    isPrivate: null,
    dateOfBirth: null,
    followingCount: null,
    followersCount: null,
    avatar: null,
};

// Define the reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload, // Merge the state with the payload
            };
        case "CLEAR_USER":
            return {
                ...initialUserState,
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
    const user = get("user");
    const [state, dispatch] = useReducer(userReducer, {
        ...initialUserState,
        userId: user?.id || null,
        username: user?.username || null,
        email: user?.email || null,
        fullName: user?.fullName || null,
        phone: user?.phone || null,
        isPrivate: user?.isPrivate || null,
        dateOfBirth: user?.dateOfBirth || null,
        followingCount: user?.followingCount || null,
        followersCount: user?.followersCount || null,
        avatar: user?.profilePic || null,
    });

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
