'use client';

import { Box, Divider, Grid2, Stack, Skeleton } from "@mui/material";

export default function CommentItemSkeleton() {
    return (
        <>
            <Grid2 container direction={'row'} spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* Comment */}
                <Grid2 size={7} sx={{ height: '100%' }}>
                    {/* Comment info */}
                    <Grid2 container height={'100%'}>
                        {/* Avatar */}
                        <Grid2 size={1}>
                            <Skeleton variant="circular" width={50} height={50} />
                        </Grid2>
                        {/* username, content, metrics, reply textField */}
                        <Grid2 size={11}>
                            <Stack height={'100%'} display={'flex'} spacing={1}>
                                <Box>
                                    {/* Username */}
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Skeleton variant="text" width={80} height={20} />
                                        <Skeleton variant="text" width={60} height={16} />
                                    </Stack>
                                    {/* Content */}
                                    <Skeleton variant="text" width="80%" height={40} />
                                </Box>
                                {/* Metrics */}
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Skeleton variant="text" width={60} height={16} />
                                    <Skeleton variant="rectangular" width={50} height={30} />
                                    <Skeleton variant="text" width={40} height={16} />
                                </Stack>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Post of comment */}
                <Grid2 size={5} height={'100%'}>
                    <Grid2 container direction={'row'} height={'100%'} spacing={1}>
                        <Grid2 size={4}>
                            <Skeleton variant="rectangular" width="100%" height={100} sx={{
                                borderRadius: 2
                            }} />
                        </Grid2>
                        <Grid2 size={8}>
                            <Grid2 size={8} height={'100%'} width={'100%'}>
                                <Stack sx={{ justifyContent: 'space-between', height: '100%', width: '100%' }}>
                                    <Stack spacing={1}>
                                        {/* Title */}
                                        <Skeleton variant="text" width="100%" height={20} />
                                        {/* Metrics */}
                                        <Stack direction={'row'} spacing={2}>
                                            <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton variant="text" width={40} height={16} />
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton variant="text" width={40} height={16} />
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton variant="text" width={40} height={16} />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Divider />
        </>
    );
}
