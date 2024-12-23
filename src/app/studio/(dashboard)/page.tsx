'use client';

import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import RecentPostItem from "./components/recent-post-item";
import AccountInfo from "./components/account-info";
import RecentCommentItem from "./components/recent-comment";
import TimeSelect from "./components/time-select";
import KeyMetricItem from "./components/key-metric-item";
import { useEffect, useState } from "react";
import { getMyRecentVideos } from "@/services/real/video";
import { useAppContext } from "@/contexts/app-context";
import { getMyRecentVideoComments } from "@/services/real/comment";

interface State {
    recentPosts?: any[];
    recentComments?: any[];
}

export default function StudioDashBoardPage() {
    const [state, setState] = useState<State>();
    const router = useRouter();
    const { showAlert } = useAppContext();

    const fetchRecentPosts = async () => {
        const result = await getMyRecentVideos();
        if (!result.success || !result.videos) {
            showAlert({ message: result.message, severity: 'error' });
            return undefined;
        }
        return result.videos;
    };

    const fetchRecentComments = async () => {
        const result = await getMyRecentVideoComments();
        if (!result.success || !result.comments) {
            showAlert({ message: result.message, severity: 'error' });
            return undefined;
        }
        return result.comments;
    };

    const fetchData = async () => {
        const recentPosts = await fetchRecentPosts();
        const recentComments = await fetchRecentComments();
        setState({ recentPosts: recentPosts, recentComments: recentComments });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
            position: 'relative',
        }}>
            <Grid2 container direction={'row'} spacing={1} sx={{
                width: '90%',
                borderRadius: '10px',
            }}>
                {/* Left side */}
                <Grid2 size={8}>
                    <Stack spacing={2}>
                        {/* Key metrics, contain: Video views, Likes, Comments, Shares */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 1,
                            borderRadius: '10px',
                        }}>
                            <Stack direction="row"
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h5" fontWeight={'bold'}>Key metrics</Typography>
                                <TimeSelect />
                            </Stack>

                            {/* Video views, Likes */}
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                {/* Video views */}
                                <KeyMetricItem
                                    title="Video views"
                                    value={2552675}
                                    compareValue={532564}
                                    compareTime="Nov 8 - Nov 14"
                                />
                                {/* Likes */}
                                <KeyMetricItem
                                    title="Likes"
                                    value={121456}
                                    compareValue={45324}
                                    compareTime="Nov 8 - Nov 14"
                                />
                            </Stack>

                            {/* Comments, Shared */}
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                {/* Comment */}
                                <KeyMetricItem
                                    title="Comments"
                                    value={17342}
                                    compareValue={3256}
                                    compareTime="Nov 8 - Nov 14"
                                />
                                {/* Shared */}
                                <KeyMetricItem
                                    title="Shares"
                                    value={5426}
                                    compareValue={347}
                                    compareTime="Nov 8 - Nov 14"
                                />
                            </Stack>
                        </Stack>

                        {/* Recent post */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 1,
                            borderRadius: '10px',
                        }}>
                            <Typography variant="h5" fontWeight={'bold'}>Recent post</Typography>
                            {state?.recentPosts?.map((post, index) => (
                                <RecentPostItem key={index} post={post} />
                            ))}
                            <Button variant='outlined' color='inherit'
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid black',
                                    ":hover": {
                                        border: '1px solid #EA284E',
                                        backgroundColor: '#EA284E',
                                        color: 'white',
                                    }
                                }}
                                onClick={() => router.push('/studio/post')}
                            >Show all</Button>
                        </Stack>
                    </Stack>
                </Grid2>

                {/* Right side */}
                <Grid2 size={4}>
                    <Stack spacing={2}>
                        {/* Account info */}
                        <AccountInfo />

                        {/* Recent comments */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 2,
                            borderRadius: '10px',
                        }}>
                            <Typography variant="h5" fontWeight={'bold'}>Recent comments</Typography>
                            {state?.recentComments?.map((comment, index) => (
                                <RecentCommentItem
                                    key={comment.id}
                                    recentComment={comment}
                                />
                            ))}
                            <Button variant='outlined' color='inherit'
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid black',
                                    ":hover": {
                                        border: '1px solid #EA284E',
                                        backgroundColor: '#EA284E',
                                        color: 'white',
                                    }
                                }}
                                onClick={() => router.push('/studio/comment')}
                            >Show all</Button>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </Stack>
    );
}
