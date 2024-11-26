'use client';

import { useContentContext } from "@/contexts/content-context";
import { Avatar, Box, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

export default function Page() {
    const { dispatch } = useContentContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch({
            type: 'SET_CURRENT_DRAWER_ITEM',
            payload: 'FOR_YOU',
        });

        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box padding={2}>
            <Grid2 container spacing={2}>
                {
                    [...Array(11)].map((_, index) => (
                        isLoading
                            ? <VideoItemSkeleton key={index} />
                            : <VideoItem key={index} index={index} />
                    ))
                }
            </Grid2>
        </Box>
    );
}

interface VideoItemProps {
    index: number;
}
function VideoItem(props: VideoItemProps) {
    return (
        <Grid2
            key={props.index}
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
                {/* Thumbnail */}
                <Box sx={{
                    width: '100%',
                    height: '75%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <Image
                        src="/images/video-image.jpg"
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>

                <Stack direction={'row'} spacing={1} sx={{
                    width: '100%',
                    paddingBottom: 2,
                    justifyContent: 'start',
                }}>
                    <Avatar
                        alt="Avt"
                        src="/images/avatar.jpg"
                        sx={{
                            width: 'auto',
                            aspectRatio: 1,
                        }}
                    />
                    <Stack>
                        <Typography variant="h6" fontWeight={'bold'}>@lmkha</Typography>
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Typography variant="body2">1.2k views</Typography>
                            <Typography variant="body2">1 day ago</Typography>
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
