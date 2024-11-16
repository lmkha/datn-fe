'use client';

import { Grid2, Stack } from "@mui/material";
import RecommendSection from "./components/recommend-section/recommend-section";
import CommentSection from "./components/comments-section/comment-section";
import VideoSection from "./components/video-section/video-section";

export default function VideoPage() {
    return (
        <>
            <Grid2 container sx={{
                height: '100vh',
                overflowY: 'auto',
            }}>
                {/* Video + Comments */}
                <Grid2 size={9} sx={{
                    backgroundColor: 'white',
                    height: 'auto',
                }}>
                    <Stack sx={{
                        height: 'auto',
                    }}>
                        {/* Video section */}
                        <VideoSection />
                        {/* Comment section */}
                        <CommentSection />
                    </Stack>
                </Grid2>

                {/* Recommend videos section*/}
                <Grid2 size={3} sx={{
                    height: 'auto',
                }}>
                    <RecommendSection />
                </Grid2>
            </Grid2>
        </>
    );
}
