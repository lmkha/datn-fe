
'use client';

import { Comment, RecommendedVideo } from "@/app/[username]/videos/[videoId]/types";
import React, { createContext, useReducer, ReactNode, useContext } from "react";

export interface VideoState {
    comments: Comment[];
    theaterMode: boolean;
    topRecommendVideos: RecommendedVideo[];
    bottomRecommendVideos: RecommendedVideo[];
}

export type VideoAction =
    | { type: 'SET_COMMENTS'; payload: Comment[] }
    | { type: 'TOGGLE_THEATER_MODE' }
    | { type: 'SET_TOP_RECOMMEND_VIDEOS'; payload: RecommendedVideo[] }
    | { type: 'SET_BOTTOM_RECOMMEND_VIDEOS'; payload: RecommendedVideo[] };

export const initialVideoState: VideoState = {
    comments: [],
    theaterMode: true,
    topRecommendVideos: [],
    bottomRecommendVideos: [],
};

export const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'TOGGLE_THEATER_MODE':
            return { ...state, theaterMode: !state.theaterMode };
        case 'SET_TOP_RECOMMEND_VIDEOS':
            return { ...state, topRecommendVideos: action.payload };
        case 'SET_BOTTOM_RECOMMEND_VIDEOS':
            return { ...state, bottomRecommendVideos: action.payload };
        default:
            return state;
    }
};

interface VideoContextProps {
    state: VideoState;
    dispatch: React.Dispatch<VideoAction>;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(videoReducer, initialVideoState);

    return (
        <VideoContext.Provider value={{ state, dispatch }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = (): VideoContextProps => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error("useVideoContext must be used within a VideoProvider");
    }
    return context;
};
