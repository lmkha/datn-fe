'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from "react";
import { ChildComment, ParentComment } from "../../types";

interface ChildCommentProps {
    comment?: ChildComment;
    onLike?: () => void;
    onUnLike?: () => void;
}
export default function ChildCommentComponent(props: ChildCommentProps) {
    const [liked, setLiked] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    return (
        <Stack direction={'row'} sx={{
            width: '100%',
            minHeight: '50px',
            cursor: 'pointer',
        }}>
            <Box padding={1}>
                <Avatar
                    src="/images/avatar.jpg"
                    alt="avatar"
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </Box>
            <Stack sx={{
                overflowY: 'auto',
                width: '100%',
            }}>
                {/* Username, updated time */}
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        {/* {props?.comment?.username} */}
                        Username
                    </Typography>
                    <Typography variant="body2">
                        {/* {props?.comment?.createdAt} */}
                        created at
                    </Typography>
                </Stack>
                {/* Content */}
                <Typography
                    variant="body2"
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'revert',
                        WebkitLineClamp: 2,
                    }}
                >
                    {props.comment?.content}
                </Typography>
                {/* Like, Open Reply button */}
                <Stack direction={'row'} spacing={4}>
                    <Stack direction={'row'} spacing={1} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <IconButton onClick={(event) => {
                            event.stopPropagation();
                            setLiked(!liked);
                        }}>
                            {liked ? <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> : <FavoriteBorderOutlinedIcon />}
                        </IconButton>
                        <Typography variant="body2">{props.comment?.likes}</Typography>
                    </Stack>
                    {/* Open Reply TextField */}
                    <Button
                        onClick={() => setOpenReply(!openReply)}
                        size="small"
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            backgroundColor: 'transparent',
                            ":hover": {
                                backgroundColor: 'lightgray',
                            }
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            sx={{ color: 'black' }}>
                            Reply
                        </Typography>
                    </Button>
                </Stack>
                {/* Reply TextField */}
                {openReply && <TextField
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    size="small"
                    placeholder="Add a reply..."
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    slotProps={{
                        input: {
                            endAdornment:
                                <Stack direction={'row'} spacing={1}>
                                    <Divider orientation="vertical" flexItem />
                                    {/* Cancel reply button */}
                                    <Button
                                        onClick={() => setOpenReply(false)}
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: '10px',
                                            backgroundColor: 'transparent',
                                            ":hover": {
                                                backgroundColor: 'lightgray',
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontSize={'14px'}
                                            fontWeight={'bold'}
                                            sx={{ color: 'black' }}>
                                            Cancel
                                        </Typography>
                                    </Button>
                                    {/* Send Reply button */}
                                    <Button
                                        variant="contained"
                                        disabled={replyContent.length === 0}
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: '10px',
                                            backgroundColor: '#EA284E',
                                        }}
                                    >
                                        < Typography
                                            variant="body2"
                                            fontSize={'14px'}
                                            fontWeight={'bold'}
                                            sx={{
                                                color: replyContent.length === 0 ? 'black' : 'white',
                                            }}>
                                            Reply
                                        </Typography>
                                    </Button>
                                </Stack>,
                            sx: {
                                borderRadius: '10px',
                                backgroundColor: '#F8F8F8',
                            }
                        }
                    }}
                />}
            </Stack>
        </Stack >
    );
}