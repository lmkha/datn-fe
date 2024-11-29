'use client';

import { createContext, useContext, useReducer } from "react";

export interface ContentState {
    openDrawer?: boolean;
    searchQuery?: string;
}

export type ContentAction =
    | { type: 'DUMMY' }
    | { type: 'TOGGLE_DRAWER' }
    | { type: 'SET_SEARCH_QUERY'; payload: string };

export const initialStudioState: ContentState = {
    openDrawer: true,
    searchQuery: '',
};

export const contentReducer = (state: ContentState, action: ContentAction): ContentState => {
    switch (action.type) {
        case 'DUMMY':
            return state;
        case 'TOGGLE_DRAWER':
            return { ...state, openDrawer: !state.openDrawer };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
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
