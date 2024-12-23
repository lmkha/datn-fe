'use client';

import { IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/convert";
import UserAvatar from "@/core/components/avatar";
import { get } from "@/hooks/use-local-storage";

interface ReplyRecentCommentProps {
    recentComment?: any;
};
export default function ReplyRecentComment(props: ReplyRecentCommentProps) {
    const myUserId = get<any>('user')?.id;

    return (
        <Stack spacing={1} sx={{
            width: '100%',
            height: '200px',
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            padding: 1,
        }}>
            <Typography variant="body1" fontWeight={'bold'}>Reply to recent comment</Typography>
            {/* Recent Comment */}
            <Stack direction={'row'} spacing={1} alignItems={'start'}>
                <UserAvatar
                    src={props?.recentComment?.userAvatar}
                    size={40}
                />
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
            </Stack>
            {/* Reply TextField */}
            <TextField
                size="small"
                placeholder="Reply to this comment"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: <IconButton>
                            <SendIcon />
                        </IconButton>,
                        sx: {
                            borderRadius: '10px',
                            backgroundColor: '#E0E0E0',
                        }
                    }
                }}
            />
        </Stack>
    );
}
