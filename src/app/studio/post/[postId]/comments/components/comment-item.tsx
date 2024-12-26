'use client';

import { Box, Button, Divider, Grid2, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/format";
import UserAvatar from "@/core/components/avatar";
import { get } from "@/hooks/use-local-storage";


interface CommentItemProps {
    comment?: any;
};
export default function CommentItem(props: CommentItemProps) {
    const [openReply, setOpenReply] = useState(false);
    return (
        <>
            <Grid2 container direction={'row'} spacing={2} sx={{
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                {/* Comment */}
                <Grid2 size={7} sx={{
                    height: '100%',
                }}>
                    {/* Comment info */}
                    <Grid2 container height={'100%'}>
                        {/* Avatar */}
                        <Grid2 size={1}>
                            <UserAvatar
                                src={props?.comment?.userAvatar}
                                size={40}
                            />
                        </Grid2>
                        {/* username, content, metrics, reply textField */}
                        <Grid2 size={11}>
                            <Stack height={'100%'} justifyContent={'space-between'} display={'flex'}>
                                <Box>
                                    {/* Username */}
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography variant="body1" fontWeight={'bold'}>{props?.comment?.username}</Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#EA284E', }}
                                        >
                                            {props?.comment?.userId === get<any>('user')?.id ? 'You' : 'Viewer'}
                                        </Typography>
                                    </Stack>
                                    {/* Content */}
                                    <Typography
                                        variant="body2"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: 2,
                                            whiteSpace: 'normal',
                                        }}
                                    >{props?.comment?.content}</Typography>
                                </Box>
                                {/* Metrics */}
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Typography variant="body2" color="textSecondary">
                                        {formatTimeToShortText(props?.comment?.createdAt)}
                                    </Typography>
                                    <Button
                                        onClick={() => setOpenReply(!openReply)}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            color: '#EA284E',
                                        }}
                                        startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontWeight: 'bold' }} />}>
                                        Reply
                                    </Button>
                                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon />
                                        </IconButton>
                                        <Typography variant="body2" color="textSecondary">{formatNumberToShortText(props?.comment?.likes)}</Typography>
                                    </Stack>
                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            color: 'gray'
                                        }}
                                        startIcon={<DeleteForeverOutlinedIcon sx={{ fontWeight: 'bold' }} />}>
                                        Delete
                                    </Button>
                                </Stack>
                                {/* Reply input */}
                                {openReply && (
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
                                )}
                            </Stack>

                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Divider />
        </>
    );
}