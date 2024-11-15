'use client';

import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function VideoPage() {
    const { username, videoId } = useParams();

    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';

    return (
        <>
            <Grid2 container sx={{
                height: '100vh',
                overflowY: 'auto',
            }}>
                {/* Video + Comments */}
                <Grid2 size={9} sx={{
                    backgroundColor: 'green',
                    height: 'auto',
                }}>
                    <Stack sx={{
                        height: 'auto',
                    }}>
                        <VideoComponent />
                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />
                    </Stack>
                </Grid2>

                {/* Recommend videos */}
                <Grid2 size={3} sx={{
                    backgroundColor: 'blue',
                    height: 'auto', // Không giới hạn chiều cao
                }}>
                    <Stack spacing={1} px={1}>
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                        <RecommendVideoComponent />
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
}

// Contain authorAvatar, userName, fullName, video, title, description, tags, views, likes, dislikes, comments
function VideoComponent() {
    return (
        <Stack sx={{
            width: '100%',
            height: '650px',
        }}>
            <Box sx={{
                backgroundColor: 'black',
                width: '100%',
                height: '500px',
                borderRadius: '10px',
            }}>
                Video player
            </Box>
            <Stack>
                {/* Title + heart, comment, share */}
                <Grid2 container sx={{ width: '100%' }}>
                    {/* Title */}
                    <Grid2 size={9}>
                        <Typography variant="h6" fontWeight={'bold'}>
                            M10 Humiliates Cr7 And Real Madrid In The 2011 Champions Semifinal
                        </Typography>
                    </Grid2>
                    {/* Heart, comment, share */}
                    <Grid2 size={3}>
                        <Stack direction={'row'} spacing={2} justifyContent={'end'} alignItems={'end'}>
                            <Typography>Heart</Typography>
                            <Typography>Comment</Typography>
                            <Typography>Share</Typography>
                        </Stack>
                    </Grid2>
                </Grid2>

                {/* Author */}
                <Stack>
                </Stack>

                {/* Description, views, date posted */}
            </Stack>
        </Stack>
    );
}

function CommentComponent() {
    return (
        <Box sx={{
            backgroundColor: 'yellow',
            width: '100%',
            height: '70px',
            padding: '10px',
            borderBottom: '1px solid lightgray'
        }}>

        </Box>
    );
}

function RecommendVideoComponent() {
    return (
        <Box sx={{
            backgroundColor: 'gray',
            width: '100%',
            height: '200px',
            padding: '10px',
            borderRadius: '10px',
        }}>
            Recommend video
        </Box>
    );
}