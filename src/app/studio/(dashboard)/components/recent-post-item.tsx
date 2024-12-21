'use client';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Grid2, Stack, Typography } from "@mui/material";
import VideoThumbnail from '@/core/components/video-thumbnail';
import { formatDate, formatNumberToShortText } from '@/core/logic/convert';

interface RecentPostItemProps {
    post?: any;
};
export default function RecentPostItem(props: RecentPostItemProps) {
    return (
        <Grid2 container direction={'row'} spacing={2} sx={{
            width: '100%',
            backgroundColor: '#F8F8F8',
            borderRadius: '10px',
            height: 100,
        }}>
            <Grid2 size={3}>
                <VideoThumbnail
                    thumbnailUrl={props?.post?.thumbnailUrl}
                    width={'100%'}
                    height={100}
                />
            </Grid2>
            <Grid2 size={9}>
                <Stack justifyContent={'space-between'} sx={{ height: '100%' }}>
                    <Typography variant="h6" fontWeight={'bold'} sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{props?.post?.title}</Typography>
                    <Stack spacing={1}>
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <PlayArrowOutlinedIcon />
                                <Typography>{formatNumberToShortText(props?.post?.viewsCount || 0)}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <FavoriteBorderOutlinedIcon />
                                <Typography>{formatNumberToShortText(props?.post?.likesCount || 0)}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <ChatBubbleOutlineOutlinedIcon />
                                <Typography>{formatNumberToShortText(props?.post?.commentsCount || 0)}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Typography>{props?.post?.isPrivate ? 'Only me' : 'Every one'}</Typography>
                            <Typography>{formatDate(props?.post?.createdAt)}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid2>
        </Grid2>
    );
}
