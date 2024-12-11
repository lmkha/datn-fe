'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from "react";
import { ChildComment } from "../../types";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { formatTimeToShortText } from "@/core/logic/convert";
import { isCommentLiked, likeComment, replyComment, unlikeComment } from "@/services/real/comment";
import { useAppContext } from "@/contexts/app-context";
import EditDeleteCommentMenu from "./edit-delete-menu";


interface State {
    liked?: boolean;
    openReply?: boolean;
    replyContent?: string;
    comment?: ChildComment;
    isVisible?: boolean;
}
interface ChildCommentProps {
    comment?: ChildComment;
    onReplied?: () => void;
    isVisible?: boolean;
}
export default function ChildCommentComponent(props: ChildCommentProps) {
    const { showAlert } = useAppContext();
    const router = useRouter();
    const [state, setState] = useState<State>();

    const fetchData = async () => {
        const updatedState = {
            ...state,
            comment: props.comment,
            isVisible: props.isVisible
        };

        if (props.comment?.id) {
            const checkIsLikedResult = await isCommentLiked(props.comment.id);
            if (checkIsLikedResult.success && checkIsLikedResult.isLiked) {
                updatedState.liked = true;
            }
        }

        setState(updatedState);
    };

    // Only 2 levels of comments are supported, reply child -> transform to parent
    const handleReply = async () => {
        if (state?.comment?.videoId && state?.comment?.parentId && state?.replyContent) {
            replyComment({
                videoId: state.comment.videoId,
                replyTo: state.comment.parentId,
                content: state.replyContent
            }).then((result) => {
                if (result.success) {
                    setState({ ...state, openReply: false, replyContent: '' });
                    props.onReplied && props.onReplied();
                } else {
                    showAlert(result.message, 'error');
                }
            });
        }
    };

    const handleLike = async () => {
        if (!state?.comment?.id) return;
        const result = await likeComment(state.comment.id);
        if (result.success) {
            setState((prevState) => ({
                ...prevState,
                comment: {
                    ...prevState?.comment,
                    likes: (prevState?.comment?.likes ?? 0) + 1,
                },
                liked: true,
            }));
        }
    };

    const handleUnLike = async () => {
        if (!state?.comment?.id) return;
        const result = await unlikeComment(state.comment.id);
        if (result.success) {
            setState((prevState) => ({
                ...prevState,
                comment: {
                    ...prevState?.comment,
                    likes: (prevState?.comment?.likes ?? 0) - 1,
                },
                liked: false,
            }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setState({ ...state, isVisible: props.isVisible });
    }, [props.isVisible]);

    if (!state?.isVisible) return null;

    return (
        <Stack direction={'row'} spacing={2} sx={{
            width: '100%',
            minHeight: '50px',
            cursor: 'pointer',
        }}>
            {state?.comment?.userAvatar ? (<Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
            }}
                onClick={() => {
                    state?.comment?.username &&
                        router.push(`/@${state.comment.username}`);
                }}
            >
                <CldImage
                    fill={true}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    src={state.comment.userAvatar}
                    alt="Image"
                />
            </Box>) :
                (<Avatar
                    src="/images/avatar.png"
                    alt="avatar"
                    sx={{
                        width: 40,
                        height: 40,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        state?.comment?.username &&
                            router.push(`/@${state.comment.username}`);
                    }}
                />)
            }
            <Stack sx={{
                overflowY: 'auto',
                width: '100%',
            }}>
                {/* Username, updated time */}
                <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{
                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Stack
                        spacing={2}
                        direction={'row'}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body1" fontWeight={'bold'}>
                            {props?.comment?.username}
                        </Typography>
                        <Typography variant="body2">
                            {formatTimeToShortText(state?.comment?.createdAt || '')}
                        </Typography>
                    </Stack>
                    <EditDeleteCommentMenu />
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
                    {state?.comment?.content}
                </Typography>
                {/* Like, Open Reply button */}
                <Stack direction={'row'} spacing={4}>
                    <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                if (state?.liked) {
                                    handleUnLike();
                                } else {
                                    handleLike();
                                }
                            }}
                        >
                            {state?.liked ? <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> : <FavoriteBorderOutlinedIcon />}
                        </IconButton>
                        <Typography variant="body2">{state?.comment?.likes}</Typography>
                    </Stack>
                    {/* Open Reply TextField */}
                    <Button
                        onClick={() => setState({ ...state, openReply: true })}
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
                {state?.openReply && <TextField
                    value={state?.replyContent}
                    onChange={(e) => setState({ ...state, replyContent: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleReply();
                        }
                    }}
                    size="small"
                    placeholder="Add a reply..."
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        width: '100%',
                    }}
                    slotProps={{
                        input: {
                            startAdornment:
                                <Button sx={{
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                    backgroundColor: 'transparent',
                                    marginRight: 1,
                                }}>
                                    <Typography
                                        variant="body2"
                                        fontSize={'14px'}
                                        fontWeight={'bold'}
                                        sx={{ color: 'black' }}
                                    >
                                        @{props?.comment?.username}
                                    </Typography>
                                </Button>,
                            endAdornment:
                                <Stack direction={'row'} spacing={1}>
                                    <Divider orientation="vertical" flexItem />
                                    {/* Cancel reply button */}
                                    <Button
                                        onClick={() => setState({ ...state, openReply: false })}
                                        onMouseDown={(e) => e.preventDefault()}
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
                                        onClick={handleReply}
                                        onMouseDown={(e) => e.preventDefault()}
                                        disabled={state?.replyContent?.length === 0}
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
                                                color: state?.replyContent?.length === 0 ? 'black' : 'white',
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
