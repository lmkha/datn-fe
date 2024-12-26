
'use client';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Avatar, Divider, Grid2, Stack, Typography } from "@mui/material";
import VideoThumbnail from '@/core/components/video-thumbnail';
import UserAvatar from '@/core/components/avatar';
import { formatNumberToShortText, formatTimeToShortText } from '@/core/logic/format';
import { get } from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';

interface RecentCommentItemProps {
    recentComment?: any;
};
export default function RecentCommentItem(props: RecentCommentItemProps) {
    const router = useRouter();
    const myUserId = get<any>('user')?.id;

    const handleCommentClick = () => {
        if (!props?.recentComment?.videoId || !props?.recentComment?.id) return;
        router.push(`/studio/post/${props?.recentComment?.videoId}/comments?commentId=${props?.recentComment?.id}`);
    };

    return (
        <Grid2
            container
            direction={'row'}
            sx={{
                width: '100%',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
                alignItems: 'center',
                padding: 1,
                ":hover": {
                    backgroundColor: '#FFF2F5',
                },
                cursor: 'pointer',
            }}
            onClick={handleCommentClick}
        >
            <Grid2 size={9}>
                <Grid2 container direction={'row'} spacing={1} sx={{
                    alignItems: 'center',
                }}>
                    <Grid2 size={2}>
                        <UserAvatar
                            src={props?.recentComment?.userAvatar}
                            size={40}
                        />
                    </Grid2>
                    <Grid2 size={10}>
                        <Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography fontWeight={'bold'}>@{props?.recentComment?.username}</Typography>
                                <Typography sx={{ color: '#EA284E' }}>
                                    {myUserId === props?.recentComment?.userId ? 'You' : 'Viewer'}
                                </Typography>
                                <Typography color='textSecondary'>{formatTimeToShortText(props?.recentComment?.createdAt)}</Typography>
                            </Stack>
                            <Typography
                                variant='body1'
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                color='textSecondary'
                            >{props?.recentComment?.content}</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography>{formatNumberToShortText(props?.recentComment?.likes)}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography>{formatNumberToShortText(props?.recentComment?.replyCount)} replies</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
                <Typography
                    variant='body1'
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: 'bold',
                    }}
                >
                    {props?.recentComment?.videoTitle}
                </Typography>
            </Grid2>

            <Grid2 size={3} height={'100%'}>
                <Stack direction="row" spacing={1} sx={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <VideoThumbnail
                        thumbnailUrl={props?.recentComment?.thumbnailUrl}
                        height={70}
                        width={'100%'}
                    />
                </Stack>
            </Grid2>
        </Grid2 >
    );
}
