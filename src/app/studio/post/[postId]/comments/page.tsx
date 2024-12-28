'use client';

import { Box, Button, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter, useSearchParams, useParams } from "next/navigation";
import VideoThumbnail from "@/core/components/video-thumbnail";
import { getVideoByVideoId } from "@/services/real/video";
import { useAppContext } from "@/contexts/app-context";
import { formatNumberToShortText } from "@/core/logic/format";
import { getAllMyVideoCommentsByVideoId, getCommentById, getCommentsByVideoId } from "@/services/real/comment";
import ReplyRecentComment from "./components/reply-recent-comment";
import CommentItem from "./components/comment-item";
import SelectComponent from "./components/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteComment, getAllMyVideoComments, likeComment, replyCommentInStudio, unlikeComment, updateComment } from "@/services/real/comment";
import { debounce } from "lodash";
import CommentItemSkeleton from "./components/comment-item-skeleton";
import { getAllFollowers } from "@/services/real/user";

interface State {
    post?: any;
    comments?: any[];
    recentComment?: any;
    repliedRecentComment?: boolean;
    openDeleteDialog?: boolean;
    deletedComment?: any;
    isFiltering?: boolean;
    isFetching?: boolean;
}
interface FilterValue {
    search?: string;
    status?: string;
    postedBy?: string;
    likes?: string;
}

type FilterField = 'search' | 'status' | 'postedBy' | 'likes';

export default function CommentDetailPage() {
    const [state, setState] = useState<State>();
    const router = useRouter();
    const postId = useParams().postId;
    const commentId = useSearchParams().get('commentId');
    const { showAlert } = useAppContext();
    const allComment = useRef<any[]>();
    const filteredCommentsByStatus = useRef<any[]>();
    const [filterValue, setFilterValue] = useState<FilterValue>();

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

    const fetchAllComments = async () => {
        const result = await getAllMyVideoCommentsByVideoId(postId as string);
        if (!result.success) return undefined;
        return result.comments;
    };

    const fetchAllCommentWithStatusFilter = async (status: 'all' | 'replied' | 'not-replied') => {
        const result = await getAllMyVideoCommentsByVideoId(postId as string, status);
        if (!result.success) return undefined;
        return result.comments;
    };

    const fetchData = async () => {
        setState({ ...state, isFetching: true });
        const [post, recentComment, comments] = await Promise.all([
            fetchPost(),
            fetchRecentComment(),
            fetchAllComments(),
        ]);
        allComment.current = comments;
        setState({
            ...state,
            post: post,
            recentComment: recentComment,
            comments: comments,
            isFetching: false
        });
    };

    const updateFilterField = (field: FilterField, value: string) => {
        setFilterValue({ ...filterValue, [field]: value });
    };

    const debounceHandleUpdateSearchValue = useCallback(
        debounce((searchValue: string) => {
            updateFilterField('search', searchValue)
        }, 500),
        []
    );

    const handleUpdateStatusFilter = async (status: string) => {
        if (!status) return;
        if (status === 'All comments') {
            setFilterValue({ ...filterValue, status: 'All comments' });
            return;
        }
        if (status === 'Replied') {
            filteredCommentsByStatus.current = await fetchAllCommentWithStatusFilter('replied');
            setFilterValue({ ...filterValue, status: 'Replied' });
            return;
        }
        if (status === 'Not replied') {
            filteredCommentsByStatus.current = await fetchAllCommentWithStatusFilter('not-replied');
            setFilterValue({ ...filterValue, status: 'Not replied' });
            return;
        }
    };

    const handleDeleteComment = async (commentId: string, childrenIds?: string[]) => {
        if (!commentId || !allComment.current || state?.comments?.length === 0) return;
        const result = await deleteComment(commentId);
        if (!result.success) {
            showAlert({ message: 'Failed to delete comment', severity: 'error' });
            return;
        }
        const updatedComments = state?.comments?.filter(comment => {
            if (comment.id === commentId) return false;
            if (childrenIds && childrenIds.includes(comment.id)) return false;
            return true;
        });

        allComment.current = updatedComments;

        setState({
            ...state,
            comments: updatedComments,
            openDeleteDialog: false,
            deletedComment: null
        });
        showAlert({ message: 'Comment deleted successfully', severity: 'success' });
    };

    const handleReplyComment = async (videoId: string, commentId: string, content: string) => {
        if (!videoId || !commentId || !content) return;

        const result = await replyCommentInStudio({ videoId: videoId, replyTo: commentId, content: content });
        if (!result.success || !result.newComment || !state?.comments) {
            showAlert({ message: 'Failed to reply comment', severity: 'error' });
            return;
        }

        const updatedComments = state?.comments?.map(comment =>
            comment.id === commentId
                ? { ...comment, replyCount: (comment.replyCount || 0) + 1 }
                : comment
        );

        const newComments = [result.newComment, ...updatedComments];
        allComment.current = newComments;
        setState({
            ...state,
            comments: newComments
        });
    };

    const handleEditComment = async (commentId: string, content: string) => {
        if (!commentId || !content || !state?.comments || state?.comments?.length === 0) return;
        const result = await updateComment({ commentId: commentId, content: content });
        if (!result.success) {
            showAlert({ message: 'Failed to update comment', severity: 'error' });
            return;
        }
        const updatedComments = state?.comments?.map(comment =>
            comment.id === commentId ? { ...comment, content } : comment
        );
        allComment.current = updatedComments;
        setState({
            ...state,
            comments: updatedComments,
        });
    };

    const handleLikeComment = async (commentId: string, isLike: boolean) => {
        if (!commentId || !allComment.current || !state?.comments || state?.comments?.length === 0) return;
        let result;
        if (isLike) {
            result = await likeComment(commentId);
        } else {
            result = await unlikeComment(commentId);
        }
        if (!result.success) {
            showAlert({ message: 'Failed to like comment', severity: 'error' });
            return;
        }
        const updatedComments = state?.comments?.map(comment =>
            comment.id === commentId
                ? { ...comment, likes: isLike ? comment.likes + 1 : comment.likes - 1, isLiked: isLike }
                : comment
        );
        allComment.current = updatedComments;
        setState({
            ...state,
            comments: updatedComments,
        });
    };

    const filterStatusValue = (comments: any[], status: string): any[] => {
        return comments.filter(comment => {
            if (status === 'Not replied') return !comment.replyCount;
            if (status === 'Replied') return comment.replyCount;
            return true;
        });
    };

    const filterSearchValue = (comments: any[], search: string): any[] => {
        return comments.filter(comment =>
            comment.content.toLowerCase().includes(search.toLowerCase()) ||
            comment.username.toLowerCase().includes(search.toLowerCase())
        );
    };

    const filterPostedByValue = async (comments: any[], postedBy: string): Promise<any[]> => {
        const followers = await getAllFollowers();
        if (!followers.success) return comments;

        const filteredComments = await Promise.all(
            comments.map(async (comment) => {
                const isFollower = followers.followers.includes(comment?.username);
                if (postedBy === 'Followers') {
                    return isFollower ? comment : null;
                } else if (postedBy === 'Non-followers') {
                    return !isFollower ? comment : null;
                } else {
                    return comment;
                }
            })
        );

        return filteredComments.filter(comment => comment !== null);
    };

    const filterLikesValue = (comments: any[], likes: string): any[] => {
        return comments.filter(comment => {
            if (likes === '0') return comment.likes === 0;
            if (likes === '1 - 10') return comment.likes > 0 && comment.likes <= 10;
            if (likes === '>10') return comment.likes > 10;
            return true;
        });
    };

    const filter = async () => {
        if (!allComment.current) return;
        const isFilterCommentWithStatus = filterValue?.status && filterValue?.status !== 'All comments';
        if (isFilterCommentWithStatus && !filteredCommentsByStatus.current) return;

        setState({ ...state, isFiltering: true });

        let comments = isFilterCommentWithStatus ? filteredCommentsByStatus.current || [] : allComment.current;
        const { search, status, postedBy, likes } = filterValue || {};

        if (status) comments = filterStatusValue(comments, status);
        if (search) comments = filterSearchValue(comments, search);
        if (likes) comments = filterLikesValue(comments, likes);
        if (postedBy) comments = await filterPostedByValue(comments, postedBy);
        setTimeout(() => setState({ ...state, comments: comments, isFiltering: false }), 300);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filter();
    }, [filterValue?.search, filterValue?.status, filterValue?.postedBy, filterValue?.likes]);

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
                                            <Stack direction={'row'} spacing={1}>
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
                    onChange={(e) => debounceHandleUpdateSearchValue(e.target.value)}
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
                        onChange={(value) => handleUpdateStatusFilter(value)}
                    />
                    <SelectComponent
                        label="Posted by"
                        options={['All', 'Followers', 'Non-followers']}
                        onChange={(value) => updateFilterField('postedBy', value)}
                    />
                    <SelectComponent
                        label="Likes"
                        options={['All', '0', '1 - 10', '>10']}
                        onChange={(value) => updateFilterField('likes', value)}
                    />
                </Stack>
                <Divider />
                {/* Comments */}
                {state?.isFiltering || state?.isFetching ?
                    (Array.from({ length: 5 }).map((_, index) => (
                        <CommentItemSkeleton key={index} />
                    ))) :
                    (state?.comments?.map((comment, index) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={handleReplyComment}
                            onUpdate={handleEditComment}
                            onLike={handleLikeComment}
                            onDelete={(comment) => { setState({ ...state, openDeleteDialog: true, deletedComment: comment }) }}
                        />
                    )))
                }
            </Stack>
        </Stack>
    );
}
