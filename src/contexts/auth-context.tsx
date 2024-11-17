import React, { createContext, useReducer, ReactNode, useContext } from "react";

interface AuthState {
    isLogged: boolean;
}

type AuthAction =
    | { type: 'LOGIN' }
    | { type: 'LOGOUT' };

const initialAuthState: AuthState = {
    isLogged: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { isLogged: true };
        case 'LOGOUT':
            return { isLogged: false };
        default:
            return state;
    }
};

interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
