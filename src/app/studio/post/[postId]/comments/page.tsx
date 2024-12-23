'use client';

import { Box, Button, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import VideoThumbnail from "@/core/components/video-thumbnail";
import { getVideoByVideoId } from "@/services/real/video";
import { useAppContext } from "@/contexts/app-context";
import { formatNumberToShortText } from "@/core/logic/convert";
import { getCommentById, getCommentsByVideoId } from "@/services/real/comment";
import ReplyRecentComment from "./components/reply-recent-comment";
import CommentItem from "./components/comment-item";
import SelectComponent from "./components/select";

interface State {
    post?: any;
    comments?: any[];
    recentComment?: any;
    repliedRecentComment?: boolean;
}

export default function CommentDetailPage() {
    const [state, setState] = useState<State>();
    const router = useRouter();
    const postId = useParams().postId;
    const commentId = useSearchParams().get('commentId');
    const { showAlert } = useAppContext();

    const fetchPost = async () => {
        if (!postId) undefined;
        const result = await getVideoByVideoId(postId as string);
        if (result.success) {
            return result.data;
        } else {
            showAlert({ message: result.message, severity: 'error' });
            return undefined;
        }
    };

    const fetchRecentComment = async () => {
        if (!commentId) return undefined;
        const result = await getCommentById(commentId as string);
        if (result.success) {
            return result.comment;
        } else {
            showAlert({ message: result.message, severity: 'error' });
            return undefined;
        }
    };

    const fetchComments = async () => {
        if (!postId) return undefined;
        const result = await getCommentsByVideoId(postId as string);
        if (result.success) {
            return result.comments;
        } else {
            showAlert({ message: result.message, severity: 'error' });
            return undefined;
        }
    };

    const fetchData = async () => {
        const [post, recentComment, comments] = await Promise.all([fetchPost(), fetchRecentComment(), fetchComments()]);
        setState({ post: post, comments: comments, recentComment: recentComment });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
        }}>
            <Stack spacing={2} sx={{
                padding: 2,
                width: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
            }}>
                {/* Title(clickable -> back to all comments) */}
                <Button
                    onClick={() => router.push('/studio/post')}
                    sx={{
                        textTransform: 'none',
                        color: 'black',
                        justifyContent: 'start',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                    startIcon={<ArrowBackIosIcon sx={{ fontWeight: 'bold' }} />}>
                    Back to posts
                </Button>
                <Typography variant="h5" fontWeight={'bold'}>All comments of this post</Typography>

                {/* Post info, reply comment */}
                <Box sx={{
                    width: '100%',
                    height: '300px',
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                }}>
                    <Grid2 container direction={'row'} height={'100%'}>
                        <Grid2 size={4} padding={1}>
                            <VideoThumbnail
                                thumbnailUrl={state?.post?.thumbnailUrl}
                            />
                        </Grid2>
                        <Grid2 size={8}>
                            {/* Title, metrics, reply input */}
                            <Grid2 size={8} height={'100%'} width={'100%'} padding={1}>
                                <Stack sx={{ justifyContent: 'space-between', height: '100%', width: '100%' }}>
                                    {/* Video info */}
                                    <Stack spacing={1}>
                                        {/* Title */}
                                        <Typography variant="h6" fontWeight={'bold'}
                                            sx={{
                                                width: '100%',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {/* This is the title of the post that is very long and should be truncated */}
                                            {state?.post?.title}
                                        </Typography>
                                        {/* Metrics */}
                                        <Stack direction={'row'} spacing={2}>
                                            <Stack direction={'row'} >
                                                <PlayArrowOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(state?.post?.viewsCount)}</Typography>
                                            </Stack>
                                            <Stack direction={'row'}>
                                                <FavoriteBorderOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(state?.post?.likesCount)}</Typography>
                                            </Stack>
                                            <Stack direction={'row'}>
                                                <ChatBubbleOutlineOutlinedIcon />
                                                <Typography variant="body2">{formatNumberToShortText(state?.post?.commentsCount)}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    {/* Reply input */}
                                    {commentId && !state?.repliedRecentComment && <ReplyRecentComment recentComment={state?.recentComment} />}
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>

                {/* Search title */}
                <TextField
                    size="small"
                    placeholder="Search for comments or username"
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <SearchIcon />,
                            sx: {
                                borderRadius: '10px',
                                backgroundColor: '#F8F8F8',
                            }
                        }
                    }}
                />
                {/* Filter */}
                <Stack direction={'row'} spacing={4}>
                    <SelectComponent
                        label="Status"
                        options={['All comments', 'Not replied', 'Replied']}
                    />
                    <SelectComponent
                        label="Posted by"
                        options={['All', 'Followers', 'Non-followers']}
                    />
                    <SelectComponent
                        label="Likes"
                        options={['All', '< 1000', '1K - 10K', '10K - 100K', '> 100K']}
                    />
                </Stack>
                <Divider />
                {/* Comments */}
                {state?.comments?.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </Stack>
        </Stack>
    );
}
