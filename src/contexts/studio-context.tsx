'use client';

import { createContext, useContext, useReducer } from "react";

export interface StudioState {
    openDrawer?: boolean;
}

export type StudioAction =
    | { type: 'DUMMY' }
    | { type: 'TOGGLE_DRAWER' }

export const initialStudioState: StudioState = {
    openDrawer: true,
};

export const studioReducer = (state: StudioState, action: StudioAction): StudioState => {
    switch (action.type) {
        case 'DUMMY':
            return state;
        case 'TOGGLE_DRAWER':
            return { ...state, openDrawer: !state.openDrawer };
        default:
            return state;
    }
};

interface StudioContextProps {
    state: StudioState;
    dispatch: React.Dispatch<StudioAction>;
}

const StudioContext = createContext<StudioContextProps | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(studioReducer, initialStudioState);
    return (
        <StudioContext.Provider value={{ state, dispatch }}>
            {children}
        </StudioContext.Provider>
    );
};

export const useStudioContext = (): StudioContextProps => {
    const context = useContext(StudioContext);

    if (!context) {
        throw new Error('useStudioContext must be used within a StudioProvider');
    }

    return context;
};
