'use client';

import { Avatar, Box, Button, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Suspense } from "react";
import { searchVideos } from "@/services/real/video";
import { searchUserByUsername } from "@/services/real/user";
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/convert";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { CldImage } from "next-cloudinary";

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
                    console.log(res.data);
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
                        state?.users?.map((user, index) => <UserItem key={index} />)
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
    video: any;
}
function VideoItem(props: VideoItemProps) {
    const router = useRouter();
    return (
        <Box
            key={props?.video?.id}
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
                    {/* Thumbnail & Overlay */}
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover .video-title': {
                                opacity: 1,
                                visibility: 'visible',
                            },
                        }}
                    >
                        {props?.video?.thumbnailUrl ? (
                            <CldImage
                                fill={true}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                                src={props.video.thumbnailUrl}
                                alt="Image"
                            />
                        ) : (
                            <Image
                                src="/images/video-image.png"
                                alt="Image"
                                layout="fill"
                                objectFit="revert"
                            />
                        )}

                        {/* Video overlay */}
                        <Box
                            onClick={() => {
                                props.video?.user?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.video.user.username}/videos/${props.video.id}`);
                            }}
                            className="video-title"
                            sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))',
                                display: 'flex',
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '10px',
                                opacity: 0,
                                visibility: 'hidden',
                                transition: 'opacity 0.3s ease, visibility 0.3s ease',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Stack padding={2}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {props?.video?.title}
                                </Typography>

                                <Stack>
                                    <Stack direction={'row'} spacing={2}>
                                        <Stack direction={'row'}>
                                            <PlayArrowOutlinedIcon />
                                            <Typography>125K</Typography>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <FavoriteBorderOutlinedIcon />
                                            <Typography>125K</Typography>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <ChatBubbleOutlineOutlinedIcon />
                                            <Typography>125K</Typography>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <ShortcutIcon />
                                            <Typography>125K</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} spacing={2}>
                                        <Typography>Everyone</Typography>
                                        <Typography>Nov 17, 2024</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Grid2>

                {/* Video Info */}
                <Grid2 size={8} height={'100%'} padding={1}>
                    <Stack
                        spacing={1}>
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                            onClick={() => {
                                props.video?.user?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.video.user.username}/videos/${props.video.id}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {props?.video?.title}
                        </Typography>
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Typography variant="body2">{formatNumberToShortText(props?.video?.viewsCount)} views</Typography>
                            <Typography variant="body2">{formatTimeToShortText(props?.video?.createdAt)}</Typography>
                        </Stack>
                        {/* Account info */}
                        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
                            {props?.video?.user?.profilePic ?
                                (<Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                                    onClick={(e) => {
                                        props.video?.user?.username && router.push(`/@${props.video.user.username}`);
                                        e.stopPropagation();
                                    }}
                                >
                                    <CldImage
                                        fill={true}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        src={props.video.user.profilePic}
                                        alt="Image"
                                    />
                                </Box>) :
                                (<Avatar
                                    src="/images/avatar.png"
                                    alt="avatar"
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        cursor: 'pointer',
                                    }}
                                    onClick={(e) => {
                                        props.video?.user?.username && router.push(`/@${props.video.user.username}`);
                                        e.stopPropagation();
                                    }}
                                />)}
                            <Typography variant="body1" fontWeight={'bold'}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    props.video?.user?.username && router.push(`/@${props.video.user.username}`);
                                    e.stopPropagation();
                                }}
                            >
                                @{props?.video?.user?.username}
                            </Typography>
                        </Stack>
                        <Typography variant="body2">{props?.video?.description}</Typography>
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

function UserItem() {
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
                        src="/images/avatar.png"
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