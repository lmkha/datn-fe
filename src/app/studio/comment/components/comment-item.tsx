'use client';

import { Box, Button, Divider, Grid2, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation";
import VideoThumbnail from "@/core/components/video-thumbnail";
import UserAvatar from "@/core/components/avatar";
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/convert";
import { get } from "@/hooks/use-local-storage";

interface State {
    openReply?: boolean;
    updateContent?: string;
    replyContent?: string;
    editMode?: boolean;
}

interface CommentItemProps {
    comment?: any;
    onDelete?: (comment: any) => void;
    onReply?: (videoId: string, commentId: string, content: string) => void;
    onLike?: (commentId: string) => void;
    onUpdate?: (commentId: string, content: string) => void;
}
export default function CommentItem(props: CommentItemProps) {
    const [state, setState] = useState<State>();
    const myUserId = get<any>('user')?.id;
    const router = useRouter();

    const handleReply = () => {
        if (!state?.replyContent || state?.replyContent.length === 0) return;
        setState({ replyContent: '' });
        // Reply child comment
        if (props?.comment?.parentId) {
            props?.onReply && props?.onReply(props?.comment?.videoId, props?.comment?.parentId, state?.replyContent);
            return;
        }
        // Reply parent comment
        if (props?.comment?.id) {
            props?.onReply && props?.onReply(props?.comment?.videoId, props?.comment?.id, state?.replyContent);
            return;
        }
    };

    const handleChangeEditMode = () => {
        setState({
            ...state,
            editMode: !state?.editMode,
            updateContent: props?.comment?.content,
        });
    };

    const handleUpdate = () => {
        if (!state?.updateContent || state?.updateContent.length === 0) return;
        props?.onUpdate && props?.onUpdate(props?.comment?.id, state?.updateContent);
        setState({ ...state, editMode: false });
    };

    return (
        <>
            <Grid2 container direction={'row'} spacing={2} sx={{
                justifyContent: 'center',
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
                            <UserAvatar src={props?.comment?.userAvatar} size={50} />
                        </Grid2>
                        {/* username, content, metrics, reply textField */}
                        <Grid2 size={11}>
                            <Stack height={'100%'} display={'flex'} spacing={1}>
                                <Box>
                                    {/* Username */}
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography variant="body1" fontWeight={'bold'}>@{props?.comment?.username}</Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#EA284E', }}
                                        >{myUserId === props?.comment?.userId ? 'You' : 'Viewer'}</Typography>
                                    </Stack>
                                    {/* Content */}
                                    {!state?.editMode ?
                                        (<Typography
                                            variant="body2"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                WebkitLineClamp: 2,
                                                whiteSpace: 'normal',
                                            }}
                                        >{props?.comment?.content}</Typography>) :
                                        (<TextField
                                            size="small"
                                            value={state?.updateContent}
                                            onChange={(e) => setState({ ...state, updateContent: e.target.value })}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                                            placeholder="Edit your comment"
                                            sx={{
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                            slotProps={{
                                                input: {
                                                    endAdornment:
                                                        <IconButton
                                                            disabled={!state?.updateContent || state?.updateContent.length === 0}
                                                            onClick={handleUpdate}
                                                            sx={{
                                                                backgroundColor: '#E0E0E0',
                                                                color: state?.updateContent && state?.updateContent.length > 0 ? '#EA284E' : 'gray',
                                                            }}
                                                        >
                                                            <SendIcon />
                                                        </IconButton>,
                                                    sx: {
                                                        borderRadius: '10px',
                                                        backgroundColor: '#E0E0E0',
                                                    }
                                                }
                                            }}
                                        />)
                                    }
                                </Box>
                                {/* Metrics */}
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Typography variant="body2" color="textSecondary">{formatTimeToShortText(props?.comment?.createdAt)}</Typography>

                                    <Button
                                        onClick={() => setState({ ...state, openReply: !state?.openReply })}
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

                                    {props?.comment?.userId === myUserId && (
                                        <Button
                                            onClick={handleChangeEditMode}
                                            sx={{
                                                textTransform: 'none',
                                                color: 'gray'
                                            }}
                                            startIcon={<EditIcon sx={{ fontWeight: 'bold' }} />}>
                                            Edit
                                        </Button>
                                    )}

                                    <Button
                                        onClick={() => {
                                            props?.onDelete && props?.onDelete(props?.comment);
                                        }}
                                        sx={{
                                            textTransform: 'none',
                                            color: 'gray'
                                        }}
                                        startIcon={<DeleteForeverOutlinedIcon sx={{ fontWeight: 'bold' }} />}>
                                        Delete
                                    </Button>
                                </Stack>
                                {/* Reply input */}
                                {state?.openReply && (
                                    <TextField
                                        size="small"
                                        value={state?.replyContent}
                                        disabled={!state?.openReply}
                                        onChange={(e) => setState({ ...state, replyContent: e.target.value })}
                                        onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                                        placeholder="Reply to this comment"
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment:
                                                    <IconButton
                                                        disabled={!state?.openReply || !state?.replyContent || state?.replyContent.length === 0}
                                                        onClick={handleReply}
                                                        sx={{
                                                            backgroundColor: '#E0E0E0',
                                                            color: state?.replyContent && state?.replyContent.length > 0 ? '#EA284E' : 'gray',
                                                        }}
                                                    >
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

                {/* Post of comment */}
                <Grid2 size={5} height={'100%'}>
                    <Grid2 container direction={'row'} height={'100%'} spacing={1}>
                        <Grid2 size={4}>
                            <VideoThumbnail
                                thumbnailUrl={props?.comment?.thumbnailUrl}
                                height={100}
                                width={'100%'}
                            />
                        </Grid2>
                        <Grid2 size={8}>
                            {/* Title, metrics */}
                            <Grid2 size={8} height={'100%'} width={'100%'}>
                                <Stack sx={{ justifyContent: 'space-between', height: '100%', width: '100%' }}>
                                    <Stack spacing={1}>
                                        {/* Title */}
                                        <Typography variant="body1" fontWeight={'bold'}
                                            sx={{
                                                width: '100%',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {props?.comment?.videoTitle}
                                        </Typography>
                                        {/* Metrics */}
                                        <Stack direction={'row'} spacing={2}>
                                            <Stack direction={'row'} spacing={1} sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <PlayArrowOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(props?.comment?.videoViews)}</Typography>
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <FavoriteBorderOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(props?.comment?.videoLikes)}</Typography>
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <ChatBubbleOutlineOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(props?.comment?.videoComments)}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Button
                                            onClick={() => {
                                                props?.comment?.videoId && router.push(`/studio/post/${props?.comment?.videoId}/comments`);
                                            }}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                color: '#EA284E',
                                            }}
                                        >
                                            Open all comments
                                        </Button>
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
