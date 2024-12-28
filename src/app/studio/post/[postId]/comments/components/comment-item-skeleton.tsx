'use client';

import { Box, Divider, Grid2, Skeleton, Stack } from "@mui/material";

export default function CommentItemSkeleton() {
    return (
        <>
            <Grid2 container direction={'row'} spacing={2} sx={{
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                {/* Comment Skeleton */}
                <Grid2 size={7} sx={{
                    height: '100%',
                }}>
                    {/* Comment info Skeleton */}
                    <Grid2 container height={'100%'}>
                        {/* Avatar Skeleton */}
                        <Grid2 size={1}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </Grid2>
                        {/* Username, content, metrics Skeleton */}
                        <Grid2 size={11}>
                            <Stack height={'100%'} justifyContent={'space-between'} display={'flex'}>
                                <Box>
                                    {/* Username Skeleton */}
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Skeleton variant="text" width={100} height={20} />
                                        <Skeleton variant="text" width={50} height={20} />
                                    </Stack>
                                    {/* Content Skeleton */}
                                    <Skeleton variant="text" width="90%" height={16} />
                                    <Skeleton variant="text" width="70%" height={16} />
                                </Box>
                                {/* Metrics Skeleton */}
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Skeleton variant="text" width={50} height={16} />
                                    <Skeleton variant="rectangular" width={50} height={24} />
                                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <Skeleton variant="text" width={30} height={16} />
                                    </Stack>
                                    <Skeleton variant="rectangular" width={70} height={24} />
                                </Stack>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Divider />
        </>
    );
}
