'use client';

import { Grid2, Stack } from "@mui/material";
import RecommendedVideoSection from "./components/recommended-video-section/recommended-video-section";
import CommentSection from "./components/comments-section/comment-section";
import VideoSection from "./components/video-section/video-section";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DescriptionComponent from "./components/video-section/description-component";
import { getRecommendedVideos as _mock_getRecommendedVideos, getVideoById as _mock_getVideoById } from "@/services/mock/video";
import { getVideoByVideoId } from "@/services/real/video";
import { getUserByUsername } from "@/services/real/user";
import { getAllParentCommentsOfVideo_Mock } from "@/services/mock/comment";
import { ParentComment } from "./types";

export default function VideoPage() {
    const { username, videoId } = useParams();
    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
    const [user, setUser] = useState<any>(null);
    const [video, setVideo] = useState<any>(null);
    const [comments, setComments] = useState<ParentComment[]>();

    const fetchData = async () => {
        if (actualUsername && videoId) {
            getVideoByVideoId(videoId as string).then((result) => {
                if (result.success) {
                    setVideo(result.data);
                }
            });

            getUserByUsername({ username: actualUsername as string }).then((result) => {
                if (result.success && result.user) {
                    setUser(result.user);
                }
            });
        }
    };

    useEffect(() => {
        fetchData();


        getAllParentCommentsOfVideo_Mock(videoId as string).then((result) => {
            setComments(result);
        });
    }, []);

    return (
        <Stack sx={{
            height: '100%',
        }}>
            {/* Video section */}
            <Grid2 container spacing={1} sx={{
                // border: state.theaterMode ? '1px solid lightgray' : 'none',
                border: '1px solid lightgray',
                borderRadius: '10px'
            }}>
                <Grid2 size={12}>
                    <VideoSection
                        video={video}
                        user={user}
                        changeTheaterMode={() => { }}
                    />
                </Grid2>
            </Grid2>

            {/* Description, comments, recommended videos */}
            <Grid2 container spacing={1}>
                <Grid2 size={9}>
                    {/* Description, comments */}
                    <Stack>
                        <DescriptionComponent description={video?.description} />
                        <CommentSection comments={comments} />
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
