'use client';

import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/format";
import { getVideosForHomePage } from "@/services/real/video";
import { Skeleton, } from "@mui/material";
import Image from "next/legacy/image";
import { Avatar, Box, Grid2, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useEffect, useState } from "react";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";


export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState<any[]>();

    const fetchData = async () => {
        setIsLoading(true);
        getVideosForHomePage().then((response) => {
            if (response.success) {
                setVideos(response.videos);
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box padding={2}>
            <Grid2 container spacing={2}>
                {isLoading ? (
                    <>
                        {[...Array(9)].map((_, index) => <VideoItemSkeleton key={index} />)}
                    </>) : (
                    <>
                        {videos?.map((video, index) => <VideoItem video={video} key={video?.id} />)}
                    </>)
                }
            </Grid2>
        </Box>
    );
}

interface VideoItemProps {
    video: any;
}
function VideoItem(props: VideoItemProps) {
    const router = useRouter();
    return (
        <Grid2
            minHeight={315}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
            }}
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
            }}
        >
            <Stack sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail & Overlay */}
                <Box
                    sx={{
                        width: '100%',
                        height: '75%',
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
                <Stack direction={'row'} spacing={1} sx={{
                    width: '100%',
                    paddingBottom: 2,
                    justifyContent: 'start',
                }}>
                    {/* Author's avatar */}
                    {props?.video?.user?.profilePic ?
                        (<Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                            onClick={() => {
                                props.video?.user?.username &&
                                    router.push(`/@${props.video.user.username}`);
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
                                width: 40,
                                height: 40,
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                props.video?.user?.username &&
                                    router.push(`/@${props.video.user.username}`);
                            }}
                        />)}
                    <Stack>
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                props.video?.user?.username &&
                                    router.push(`/@${props.video.user.username}`);
                            }}
                        >
                            @{props?.video?.user?.username}
                        </Typography>
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Typography variant="body2">{formatNumberToShortText(props?.video?.viewsCount)} views</Typography>
                            <Typography variant="body2">{formatTimeToShortText(props?.video?.createdAt)}</Typography>
                        </Stack>
                    </Stack>

                </Stack>
            </Stack>
        </Grid2>
    );
}

// Skeleton cho VideoItem
function VideoItemSkeleton() {
    return (
        <Grid2
            minHeight={315}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
            }}
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
            }}
        >
            <Stack sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail Skeleton */}
                <Box sx={{
                    width: '100%',
                    height: '75%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}>
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>

                <Stack direction={'row'} spacing={1} sx={{
                    width: '100%',
                    paddingBottom: 2,
                    justifyContent: 'start',
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Stack>
                        <Skeleton width="80%" height={20} />
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Skeleton width="30%" height={15} />
                            <Skeleton width="40%" height={15} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Grid2>
    );
}
