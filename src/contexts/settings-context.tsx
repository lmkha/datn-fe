'use client';

import { createContext, useContext, useReducer } from "react";

export interface SettingsState {
    openDrawer?: boolean;
}

export type SettingsAction =
    | { type: 'TOGGLE_DRAWER' }

export const initialSettingsState: SettingsState = {
    openDrawer: true,
};

export const contentReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return { ...state, openDrawer: !state.openDrawer };
        default:
            return state;
    }
};

interface SettingsContextProps {
    state: SettingsState;
    dispatch: React.Dispatch<SettingsAction>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(contentReducer, initialSettingsState);
    return (
        <SettingsContext.Provider value={{ state, dispatch }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsContext = (): SettingsContextProps => {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }

    return context;
};
