'use client';

import { createContext, useContext } from "react";

export interface StudioState {

}

export type StudioAction = { type: 'DUMMY' };

export const initialStudioState: StudioState = {};

export const studioReducer = (state: StudioState, action: StudioAction): StudioState => {
    switch (action.type) {
        case 'DUMMY':
            return state;
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
    return (
        <StudioContext.Provider value={{ state: initialStudioState, dispatch: () => { } }}>
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
