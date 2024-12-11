'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from "react";
import { ChildComment, ParentComment } from "../../types";
import ChildCommentComponent from "./child-comment";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { formatTimeToShortText } from "@/core/logic/convert";
import { getChildrenComments, getCommentById, isCommentLiked, likeComment, replyComment, unlikeComment } from "@/services/real/comment";
import EditDeleteCommentMenu from "./edit-delete-menu";

interface State {
    liked?: boolean;
    expanded?: boolean;
    openReply?: boolean;
    replyContent?: string;
    comment?: ParentComment;
    childrenComments?: ChildComment[];
}
interface CommentProps {
    videoId: string;
    comment?: ParentComment;
}
export default function ParentCommentComponent(props: CommentProps) {
    const router = useRouter();
    const [state, setState] = useState<State>();

    const fetchData = async () => {
        const updatedState = {
            ...state,
            comment: props.comment,
        };

        if (props.comment?.id) {
            const checkIsLikedResult = await isCommentLiked(props.comment.id);
            if (checkIsLikedResult.success && checkIsLikedResult.isLiked) {
                updatedState.liked = true;
            }
        }

        setState(updatedState);
    };

    const renewComment = async () => {
        if (!state?.comment?.videoId) return;

        const result = await getCommentById(state.comment.id as string);
        if (!result.success) return;

        const updatedState = {
            ...state,
            comment: result.comment as ParentComment,
            openReply: false,
            replyContent: '',
        };

        if (state?.expanded && state?.comment?.id) {
            const result2 = await getChildrenComments(state.comment.id);
            if (result2.success) {
                updatedState.childrenComments = result2.comments;
            }
        }

        setState(updatedState);
    };

    const handleReply = async () => {
        if (state?.comment?.videoId && state?.comment?.id && state?.replyContent && state?.replyContent?.length > 0) {
            const result = await replyComment({
                videoId: state.comment.videoId,
                replyTo: state.comment.id,
                content: state.replyContent
            });

            if (result.success) {
                await renewComment();
            }
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

    const handleExpand = async () => {
        if (state?.expanded) {
            setState({ ...state, expanded: false });
            return;
        }

        if (state?.childrenComments) {
            setState({ ...state, expanded: true });
            return;
        }

        if (!state?.comment?.id) return;

        getChildrenComments(state.comment.id).then((result) => {
            if (result.success) {
                setState({
                    ...state,
                    childrenComments: result.comments,
                    expanded: true
                });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack direction={'row'} spacing={2} sx={{
            width: '100%',
            minHeight: '50px',
            cursor: 'pointer',
            margin: 1,
        }}>
            {/* Avatar */}
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
                        router.push(`/@${state?.comment.username}`);
                }}
            >
                <CldImage
                    fill={true}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    src={state?.comment.userAvatar}
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
                            router.push(`/@${state?.comment.username}`);
                    }}
                />)
            }
            <Stack sx={{
                overflowY: 'auto',
                width: '100%',
            }}>
                {/* Username, updated time, More action button */}
                <Stack
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        width: '100%',
                    }}
                >
                    {/* Username, update time */}
                    <Stack
                        spacing={2}
                        direction={'row'}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Username */}
                        <Typography variant="body1" fontWeight={'bold'}>
                            {props?.comment?.username}
                        </Typography>
                        {/* created at */}
                        <Typography variant="body2">
                            {formatTimeToShortText(state?.comment?.createdAt || '')}
                        </Typography>
                    </Stack>
                    {/* More action Button */}
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
                        WebkitLineClamp: state?.expanded ? 'none' : 2,
                    }}
                >
                    {state?.comment?.content}
                </Typography>
                {/* Like, Open Reply button */}
                <Stack direction={'row'} spacing={4}>
                    <Stack direction={'row'} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <IconButton onClick={(event) => {
                            event.stopPropagation();
                            if (state?.liked) {
                                handleUnLike();
                            } else {
                                handleLike();
                            }
                        }}>
                            {state?.liked ? <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> : <FavoriteBorderOutlinedIcon />}
                        </IconButton>
                        <Typography variant="body2">{state?.comment?.likes}</Typography>
                    </Stack>
                    {/* Open Reply TextField */}
                    <Button
                        onClick={() => setState({ ...state, openReply: !state?.openReply })}
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
                                        @{state?.comment?.username}
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
                                        onClick={handleReply}
                                        onMouseDown={(e) => e.preventDefault()}
                                        variant="contained"
                                        disabled={!state?.replyContent || state?.replyContent.length === 0}
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
                                                color: state?.replyContent && state?.replyContent.length === 0 ? 'black' : 'white',
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
                {state?.comment?.replyCount !== 0 && (
                    <Button
                        onClick={handleExpand}
                        sx={{
                            width: '100px',
                            textTransform: 'none',
                            backgroundColor: '#FFF2F5'
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            sx={{ color: 'black' }}
                        >
                            {state?.expanded ? `Hide ${state.comment?.replyCount === 1 ? 'reply' : 'replies'}` :
                                (state?.comment?.replyCount === 1 ? `View ${state?.comment?.replyCount} reply` :
                                    `View ${state?.comment?.replyCount} replies`)}
                        </Typography>
                    </Button>
                )}

                {/* Children comments */}
                <Stack sx={{ width: '100%' }}>
                    {state?.childrenComments &&
                        state.childrenComments.map((child) =>
                            <ChildCommentComponent
                                comment={child}
                                onReplied={renewComment}
                                isVisible={state?.expanded}
                            />
                        )
                    }
                </Stack>
            </Stack>
        </Stack >
    );
}
