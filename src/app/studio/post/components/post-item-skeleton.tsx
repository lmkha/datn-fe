'use client';

import React from "react";
import { Grid2, Skeleton, Stack } from "@mui/material";

export default function PostItemSkeleton() {
    return (
        <Grid2 container direction={'row'} spacing={2} sx={{
            borderRadius: '10px',
            border: '1px solid #E0E0E0',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Skeleton: thumbnail, title, metrics */}
            <Grid2 size={6} height={'100%'}>
                <Grid2 container direction={'row'} spacing={1} height={'100%'}>
                    {/* Thumbnail */}
                    <Grid2 size={4} sx={{
                        height: '100%',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px',
                    }}>
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    </Grid2>

                    {/* Title, metrics */}
                    <Grid2 size={8}>
                        <Stack sx={{
                            justifyContent: 'space-between',
                            height: '100%',
                            padding: 1
                        }}>
                            {/* Title, description */}
                            <Stack spacing={1}>
                                <Skeleton variant="text" width="80%" height={24} />
                                <Skeleton variant="text" width="60%" height={20} />
                            </Stack>

                            {/* Metrics */}
                            <Stack direction={'row'} spacing={2}>
                                {[1, 2, 3].map((_, idx) => (
                                    <Stack
                                        key={idx}
                                        direction={'row'}
                                        sx={{
                                            gap: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <Skeleton variant="text" width={40} height={16} />
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Grid2>

            {/* Skeleton: actions */}
            <Grid2 size={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                    {[1, 2, 3].map((_, idx) => (
                        <Skeleton key={idx} variant="circular" width={36} height={36} />
                    ))}
                </Stack>
            </Grid2>

            {/* Skeleton: status info */}
            <Grid2 size={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: '10px' }} />
                    <Skeleton variant="text" width={50} height={16} />
                </Stack>
            </Grid2>

            {/* Skeleton: privacy */}
            <Grid2 size={2}>
                <Skeleton variant="rectangular" width="80%" height={36} sx={{ borderRadius: '5px' }} />
            </Grid2>
        </Grid2>
    );
}
