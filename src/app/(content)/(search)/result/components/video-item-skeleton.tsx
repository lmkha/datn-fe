// Skeleton cho VideoItem
'use client';

import { Box, Grid2, Skeleton, Stack } from "@mui/material";

export default function VideoItemSkeleton() {
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