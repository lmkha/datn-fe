'use client';

import { createContext, useContext, useReducer } from "react";

export type DrawerItem = 'FOR_YOU' | 'EXPLORE' | 'FOLLOWING' | 'PROFILE' | 'NONE'
export interface ContentState {
    openDrawer?: boolean;
    currentDrawerItem: DrawerItem;
}

export type ContentAction =
    | { type: 'DUMMY' }
    | { type: 'TOGGLE_DRAWER' }
    | { type: 'SET_CURRENT_DRAWER_ITEM'; payload: DrawerItem };

export const initialStudioState: ContentState = {
    openDrawer: true,
    currentDrawerItem: 'FOR_YOU',
};

export const contentReducer = (state: ContentState, action: ContentAction): ContentState => {
    switch (action.type) {
        case 'DUMMY':
            return state;
        case 'TOGGLE_DRAWER':
            return { ...state, openDrawer: !state.openDrawer };
        case 'SET_CURRENT_DRAWER_ITEM':
            return { ...state, currentDrawerItem: action.payload };
        default:
            return state;
    }
};

interface ContentContextProps {
    state: ContentState;
    dispatch: React.Dispatch<ContentAction>;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(contentReducer, initialStudioState);
    return (
        <ContentContext.Provider value={{ state, dispatch }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContentContext = (): ContentContextProps => {
    const context = useContext(ContentContext);

    if (!context) {
        throw new Error('useContentContext must be used within a ContentProvider');
    }

    return context;
};
