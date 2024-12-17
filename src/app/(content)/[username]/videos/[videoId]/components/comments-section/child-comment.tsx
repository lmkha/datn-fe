'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from "react";
import { ChildComment } from "../../types";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { formatTimeToShortText } from "@/core/logic/convert";
import { deleteComment, isCommentLiked, likeComment, replyComment, unlikeComment, updateComment } from "@/services/real/comment";
import { useAppContext } from "@/contexts/app-context";
import EditDeleteCommentMenu from "./edit-delete-menu";
import DeleteCommentDialog from "./delete-comment-dialog";
import { get } from "@/hooks/use-local-storage";
import UserAvatar from "@/core/components/avatar";

interface State {
    liked?: boolean;
    openReply?: boolean;
    replyContent?: string;
    comment?: ChildComment;
    isVisible?: boolean;
    isEditMode?: boolean;
    editContent?: string;
    openDeleteDialog?: boolean;
}
interface ChildCommentProps {
    comment?: ChildComment;
    onReplied?: () => void;
    isVisible?: boolean;
    author?: any;
    onDeleted?: () => void;
}
export default function ChildCommentComponent(props: ChildCommentProps) {
    const currentUser = get('user');
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
                    showAlert({ message: result.message, severity: 'error' });
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

    const activeEditMode = async () => {
        setState({
            ...state,
            isEditMode: true,
            editContent: state?.comment?.content || '',
        });
    };

    const handleEdit = async () => {
        if (!state?.comment?.id || !state?.editContent || state?.editContent.length === 0) return;

        const result = await updateComment({
            commentId: state.comment.id,
            content: state.editContent,
        });

        if (result.success) {
            setState({
                ...state,
                isEditMode: false,
                comment: {
                    ...state.comment,
                    content: state.editContent,
                    isEdited: true
                },
            });
        }
    };

    const handleOpenDeleteDialog = async () => {
        setState({
            ...state,
            openDeleteDialog: true,
        });
    };

    const handleDelete = async () => {
        if (!state?.comment?.id) return;

        const result = await deleteComment(state.comment.id);
        if (result.success) {
            setState({
                ...state,
                isVisible: false,
                comment: undefined,
                openDeleteDialog: false,
            });
            props.onDeleted && props.onDeleted();
        }
    };

    useEffect(() => {
        fetchData();
    }, [props.comment?.id]);

    useEffect(() => {
        setState({ ...state, isVisible: props.isVisible });
    }, [props.isVisible]);

    if (!state?.comment || !state?.isVisible) return null;

    return (
        <Stack direction={'row'} spacing={2} sx={{
            width: '100%',
            minHeight: '50px',
        }}>
            <UserAvatar
                src={state?.comment?.userAvatar}
                size={40}
                onClick={() => {
                    state?.comment?.username && router.push(`/@${state.comment.username}`);
                }}
                sx={{
                    cursor: 'pointer',
                }}
            />
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
                    {/* More action Button */}
                    {(currentUser?.username === state?.comment?.username ||
                        currentUser?.username === props?.author?.username) &&
                        (<EditDeleteCommentMenu
                            onDelete={handleOpenDeleteDialog}
                            onEdit={currentUser?.username === state?.comment?.username ? activeEditMode : undefined}
                        />)}
                </Stack>
                {/* Content, if editMode is active, show TextField */}
                {state?.isEditMode ?
                    (<TextField
                        value={state?.editContent}
                        onChange={(e) => setState({ ...state, editContent: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEdit();
                            }
                        }}
                        size="small"
                        placeholder="Edit content..."
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
                                        {/* Cancel edit button */}
                                        <Button
                                            onClick={() => setState({ ...state, isEditMode: false })}
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
                                        {/* Send  button */}
                                        <Button
                                            onClick={handleEdit}
                                            onMouseDown={(e) => e.preventDefault()}
                                            variant="contained"
                                            disabled={!state?.editContent || state?.editContent.length === 0}
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
                                                Save
                                            </Typography>
                                        </Button>
                                    </Stack>,
                                sx: {
                                    borderRadius: '10px',
                                    backgroundColor: '#F8F8F8',
                                }
                            }
                        }}
                    />) :
                    (<Typography
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
                    </Typography>)
                }
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
            <DeleteCommentDialog
                open={state?.openDeleteDialog || false}
                onClose={() => setState({ ...state, openDeleteDialog: false })}
                onDelete={handleDelete}
            />
        </Stack >
    );
}
