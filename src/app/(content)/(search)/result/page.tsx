'use client';

import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense } from "react";
import { searchVideos } from "@/services/real/video";
import { searchUserByUsername } from "@/services/real/user";
import VideoItemSkeleton from "./components/video-item-skeleton";
import VideoItem from "./components/video-item";
import UserItem from "./components/user-item";
import { MyTabs, Tab } from "./components/tabs";

export default function SearchResultPage() {
    return (
        <Suspense fallback={<PageContentSkeleton />}>
            <PageContent />
        </Suspense>
    );
}

interface PageState {
    videos: any[];
    users: any[];
    tag: string;
    query: string;
    count: number;
    selectedTab: Tab;
}

function PageContent() {
    const searchParams = useSearchParams();
    const [state, setState] = useState<PageState>({
        videos: [],
        users: [],
        selectedTab: 'Videos',
        tag: '',
        query: '',
        count: 50,
    });

    useEffect(() => {
        const query = searchParams.get('q');
        const tag = searchParams.get('tag');
        if (query) {
            setState((prevState) => ({
                ...prevState,
                query: query,
            }));
        }
        if (tag) {
            setState((prevState) => ({
                ...prevState,
                tag: tag,
            }));
        }
    }, [searchParams]);

    const fetchVideos = async () => {
        if (state.tag || state.query) {
            searchVideos({
                type: state.tag ? 'tag' : 'video',
                pattern: state.tag || state.query,
                count: state.count,
            }).then((res) => {
                if (res.success && res?.videos) {
                    setState({
                        ...state,
                        videos: res.videos,
                    })
                }
            });
        }
    };

    const fetchUsers = async () => {
        if (state.query) {
            searchUserByUsername({ username: state.query }).then((res) => {
                if (res.success && res.data) {
                    setState((prevState) => ({
                        ...prevState,
                        users: res.data,
                    }));
                }
            });
        }
    };

    useEffect(() => {
        if (state.selectedTab === 'Videos') {
            fetchVideos();
        } else {
            fetchUsers();
        }
    }, [state.selectedTab, state.query, state.tag]);

    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
        }}>
            <Box sx={{
                width: '90%',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
            }}>
                <MyTabs
                    onTabChange={(selectedTab) => { setState((prevState) => ({ ...prevState, selectedTab: selectedTab })) }}
                />
            </Box>

            {state.tag && (<Box sx={{
                width: '90%',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
                justifyContent: 'start',
                alignItems: 'center',
                display: 'flex',
            }}>
                <Typography variant="h5" fontWeight={'bold'} sx={{
                    color: 'black',
                    padding: 2,
                }}>
                    #{state.tag}
                </Typography>
            </Box>)}

            <Stack spacing={2} sx={{
                padding: 1,
                width: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
            }}>
                {
                    state.selectedTab === 'Videos' ? (
                        state?.videos?.map((video, index) => <VideoItem key={index} video={video} />)
                    ) : (
                        state?.users?.map((user, index) => <UserItem key={index} user={user} />)
                    )
                }
            </Stack>
        </Stack>
    );
}

function PageContentSkeleton() {
    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
        }}>
            <Box sx={{
                width: '90%',
                height: '50px',
                backgroundColor: 'green',
            }}>
                <Typography variant="h5" fontWeight={'bold'} sx={{
                    color: 'white',
                    padding: 2,
                }}>
                </Typography>
            </Box>

            <Stack spacing={2} sx={{
                padding: 1,
                width: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
            }}>
                {
                    [...Array(11)].map((_, index) => <VideoItemSkeleton key={index} />)
                }
            </Stack>
        </Stack>
    );
}

