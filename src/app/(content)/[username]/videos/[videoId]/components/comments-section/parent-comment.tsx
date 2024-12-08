'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from "react";
import { ChildComment, ParentComment } from "../../types";
import { getAllChildCommentsOfParentComment_Mock } from "@/services/mock/comment";
import ChildCommentComponent from "./child-comment";

interface CommentProps {
    comment?: ParentComment;
    onLike?: () => void;
    onUnLike?: () => void;
}
export default function ParentCommentComponent(props: CommentProps) {
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [childrenComments, setChildrenComments] = useState<ChildComment[]>([]);

    useEffect(() => {
        if (props.comment?.id && expanded) {
            getAllChildCommentsOfParentComment_Mock(props.comment?.id).then((children) => {
                setChildrenComments(children);
            });
        }
    }, [expanded]);


    return (
        <Stack>
            {/* Parent */}
            <Stack direction={'row'} sx={{
                width: '100%',
                minHeight: '50px',
                borderTop: '1px solid lightgray',
                borderLeft: '1px solid lightgray',
                borderRight: '1px solid lightgray',
                cursor: 'pointer',
            }}>
                <Box padding={1}>
                    <Avatar
                        src="/images/avatar.png"
                        alt="avatar"
                        sx={{
                            width: 40,
                            height: 40,
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
                            WebkitLineClamp: expanded ? 'none' : 2,
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
                                // props.onLike && props.onLike();
                                // if (disliked) {
                                //     setDisliked(false);
                                // }
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

                    {/* Show Children comments button*/}
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        sx={{
                            width: '100px',
                            textTransform: 'none',
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            sx={{ color: 'black' }}>
                            {
                                props.comment?.replyCount && props.comment?.replyCount > 0 ? props.comment?.replyCount > 1 ? `View ${props.comment?.replyCount} replies` : `View ${props.comment?.replyCount} reply`
                                    : ""
                            }
                        </Typography>
                    </Button>

                    {/* Children comments */}
                    <Stack>
                        {expanded && childrenComments.map((child) => <ChildCommentComponent comment={child} />)}
                    </Stack>
                </Stack>
            </Stack >
        </Stack >
    );
}