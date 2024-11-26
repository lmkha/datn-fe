'use client';

import { Grid2, Stack } from "@mui/material";
import RecommendedVideoSection from "./components/recommended-video-section/recommended-video-section";
import CommentSection from "./components/comments-section/comment-section";
import VideoSection from "./components/video-section/video-section";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getCommentByVideoId } from "@/services/mock/comment";
import DescriptionComponent from "./components/video-section/description-component";
import { useVideoContext } from "@/contexts/video-context";
import { getRecommendedVideos, getVideoById } from "@/services/mock/video";
import { RecommendedVideo } from "./types";

export default function VideoPage() {
    const { username, videoId } = useParams();
    const { state, dispatch } = useVideoContext();

    const fetchData = async () => {
        if (username && videoId) {
            // Fetch video data
            getVideoById(videoId as string).then((result) => {
                if (result.success) {
                }
            });
            // Fetch comments
            getCommentByVideoId(videoId as string).then((result) => {
                dispatch({ type: "SET_COMMENTS", payload: result?.comments || [] });
            });
            // Fetch recommended videos
            getRecommendedVideos(videoId as string).then((result) => {
                if (result.success) {
                    const topRecommendVideos = result.recommendedVideos?.slice(0, 3) || [];
                    const bottomRecommendVideos = result.recommendedVideos?.slice(3) || [];
                    dispatch({ type: 'SET_TOP_RECOMMEND_VIDEOS', payload: topRecommendVideos as RecommendedVideo[] });
                    dispatch({ type: 'SET_BOTTOM_RECOMMEND_VIDEOS', payload: bottomRecommendVideos as RecommendedVideo[] });
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [username, videoId]);

    const toggleTheaterMode = () => {
        dispatch({ type: "TOGGLE_THEATER_MODE" });
    };

    return (
        <Stack sx={{
            height: '100%',
        }}>
            <Grid2 container spacing={1} sx={{
                border: state.theaterMode ? '1px solid lightgray' : 'none',
                borderRadius: '10px'
            }}>
                <Grid2 size={state.theaterMode ? 12 : 9}>
                    <VideoSection changeTheaterMode={toggleTheaterMode} />
                </Grid2>

                {!state?.theaterMode && (
                    <Grid2 size={3} >
                        <RecommendedVideoSection recommendedVideos={state.topRecommendVideos} />
                    </Grid2>
                )}
            </Grid2>

            <Grid2 container spacing={1}>
                <Grid2 size={9}>
                    <Stack>
                        <DescriptionComponent />
                        <CommentSection comments={state.comments} />
                    </Stack>
                </Grid2>

                <Grid2 size={3} sx={{
                    marginTop: state.theaterMode ? 0 : '4px'
                }}>
                    <RecommendedVideoSection recommendedVideos={state.bottomRecommendVideos} />
                </Grid2>
            </Grid2>
        </Stack>
    );
}

