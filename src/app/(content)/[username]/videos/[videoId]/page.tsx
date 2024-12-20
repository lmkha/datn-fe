'use client';

import { Grid2, Stack } from "@mui/material";
import RecommendedVideoSection from "./components/recommended-video-section/recommended-video-section";
import CommentSection from "./components/comments-section/comment-section";
import VideoSection from "./components/video-section/video-section";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DescriptionComponent from "./components/video-section/description-component";
import { getVideoByVideoId } from "@/services/real/video";
import { getPublicUserByUsername } from "@/services/real/user";

export default function VideoPage() {
    const { username, videoId } = useParams();
    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
    const [author, setUser] = useState<any>(null);
    const [video, setVideo] = useState<any>(null);
    const [isCommentFocused, setIsCommentFocused] = useState<boolean>(false);

    const fetchData = async () => {
        if (actualUsername && videoId) {
            getVideoByVideoId(videoId as string).then((result) => {
                if (result.success) {
                    setVideo(result.data);
                }
            });

            getPublicUserByUsername({ username: actualUsername as string }).then((result) => {
                if (result.success && result.user) {
                    setUser(result.user);
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack sx={{
            height: '100%',
        }}>
            {/* Video section */}
            <Grid2 container spacing={1} sx={{
                border: '1px solid lightgray',
                borderRadius: '10px'
            }}>
                <Grid2 size={12}>
                    <VideoSection
                        video={video}
                        author={author}
                        changeTheaterMode={() => { }}
                        onComment={() => setIsCommentFocused(true)}
                    />
                </Grid2>
            </Grid2>

            {/* Description, comments, recommended videos */}
            <Grid2 container spacing={1}>
                <Grid2 size={9}>
                    {/* Description, comments */}
                    <Stack>
                        <DescriptionComponent description={video?.description} />
                        <CommentSection
                            videoId={videoId as string}
                            author={author}
                            isCommentOff={video?.isCommentOff}
                            isCommentFocused={isCommentFocused}
                            onCommentUnfocused={() => setIsCommentFocused(false)}
                        />
                    </Stack>
                </Grid2>

                {/* Recommended videos */}
                <Grid2 size={3}>
                    <RecommendedVideoSection
                    // recommendedVideos={}
                    />
                </Grid2>
            </Grid2>
        </Stack>
    );
}
