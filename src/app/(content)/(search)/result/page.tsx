'use client';

import { Avatar, Box, Button, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Suspense } from "react";

export default function SearchResultPage() {
    return (
        <Suspense fallback={<PageContentSkeleton />}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [tab, setTab] = useState<Tab>('Videos');

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
                    onTabChange={(selectedTab) => setTab(selectedTab)}
                />
            </Box>

            <Stack spacing={2} sx={{
                padding: 1,
                width: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
            }}>
                {
                    tab === 'Videos' ? (
                        [...Array(11)].map((_, index) => <VideoItem key={index} index={index} />)
                    ) : (
                        [...Array(1)].map((_, index) => <FollowingItem key={index} />)
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

interface VideoItemProps {
    index: number;
}
function VideoItem(props: VideoItemProps) {
    return (
        <Box
            key={props.index}
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                minHeight: 250,
            }}
        >
            <Grid2 container spacing={2} sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail */}
                <Grid2 size={4} sx={{
                    height: '100%',
                }}>
                    <Box
                        sx={{
                            cursor: 'pointer',
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                        onClick={() => {
                            console.log("Go to video");
                        }}
                    >
                        <Image
                            src="/images/video-image.jpg"
                            alt="Image"
                            layout="fill"
                            objectFit="cover"
                        />
                    </Box>
                </Grid2>

                {/* Video Info */}
                <Grid2 size={8} height={'100%'} padding={1}>
                    <Stack
                        spacing={1} sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            console.log("Go to video");
                        }}
                    >
                        <Typography variant="h6" fontWeight={'bold'}>Andres Iniesta - The last of his kind - HD</Typography>
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Typography variant="body2">1.2k views</Typography>
                            <Typography variant="body2">1 day ago</Typography>
                        </Stack>
                        {/* Account info */}
                        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                                alt="Avt"
                                src="/images/avatar.jpg"
                                sx={{
                                    width: 'auto',
                                    aspectRatio: 1,
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Go to account");
                                }}
                            />
                            <Typography variant="body1" fontWeight={'bold'}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Go to account");
                                }}
                            >
                                @lmkha
                            </Typography>
                        </Stack>
                        <Typography variant="body2">This is a tribute to one of the greatest midfielder ever. Andres Iniesta was a big part of FC Barcelona's success in the last decade. He is famous for his passing, vision, dribbles and important goals - this video includes all of them!</Typography>
                    </Stack>

                </Grid2>
            </Grid2>
        </Box>
    );
}

// Skeleton cho VideoItem
function VideoItemSkeleton() {
    return (
        <Box
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                minHeight: 250,
            }}
        >
            <Grid2 container spacing={2} sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail Skeleton */}
                <Grid2 size={4} sx={{
                    height: '100%',
                }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    </Box>
                </Grid2>

                {/* Video Info Skeleton */}
                <Grid2 size={8} height={'100%'} padding={1}>
                    <Stack spacing={1}>
                        {/* Title */}
                        <Skeleton width="80%" height={25} />
                        {/* Views & Time */}
                        <Stack direction={'row'} spacing={2}>
                            <Skeleton width="30%" height={15} />
                            <Skeleton width="30%" height={15} />
                        </Stack>
                        {/* Account Info */}
                        <Stack direction={'row'} spacing={2} alignItems="center">
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton width="50%" height={20} />
                        </Stack>
                        {/* Description */}
                        <Skeleton width="100%" height={15} />
                        <Skeleton width="90%" height={15} />
                        <Skeleton width="70%" height={15} />
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export type Tab = 'Videos' | 'Users';

interface TabsProps {
    onTabChange?: (tab: Tab) => void;
}
function MyTabs({ onTabChange }: TabsProps) {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (onTabChange) {
            const selectedTab = newValue === 0 ? 'Videos' : 'Users';
            onTabChange(selectedTab);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'black',
                        },
                    }}
                >
                    <Tab
                        label="Videos"
                        sx={{
                            textTransform: 'none',
                            fontSize: 'medium',
                            '&.Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                    <Tab
                        label="Users"
                        sx={{
                            textTransform: 'none',
                            fontSize: 'medium',
                            '&.Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                </Tabs>
            </Box>
        </Box>
    );
}

function FollowingItem() {
    const router = useRouter();
    const [followed, setFollowed] = useState<boolean>(false);

    return (
        <>
            <Grid2 container direction={'row'} sx={{
                height: '120px',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
                padding: 1
            }}>
                {/* Avatar */}
                <Grid2 size={2} height={'100%'}>
                    <Avatar
                        alt="Avt"
                        src="/images/avatar.jpg"
                        sx={{
                            height: '100%',
                            width: 'auto',
                            aspectRatio: '1',
                            cursor: 'pointer',
                        }}
                        onClick={() => router.push('/@lmkha')}
                    />
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography variant="h6" fontWeight={'bold'} onClick={() => router.push('/@lmkha')} sx={{
                            cursor: 'pointer',
                        }}>Lê Minh Kha</Typography>
                        {/* Username */}
                        <Typography variant="h6" onClick={() => router.push('/@lmkha')} sx={{
                            cursor: 'pointer',
                        }}>@lmkha</Typography>
                        {/* Bio */}
                        <Typography variant="body1">I'm a the best developer!</Typography>
                        {/* Metrics */}
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Likes</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid2>
                {/* UnFollow button */}
                <Grid2 size={2}>
                    <Button sx={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: followed ? 'lightgray' : '#EA284E',
                        color: followed ? 'black' : 'white',
                        textTransform: 'none',
                    }}
                        onClick={() => {
                            setFollowed(!followed);
                        }}
                    >
                        <Typography variant="body1" fontWeight={'bold'}>
                            {followed ? 'Unfollow' : 'Follow'}
                        </Typography>
                    </Button>
                </Grid2>
            </Grid2>
        </>
    );
}