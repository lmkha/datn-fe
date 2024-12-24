'use client';

import { Divider, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CommentItem from "./components/comment-item";
import SelectComponent from "./components/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteComment, getAllMyVideoComments, replyCommentInStudio, updateComment } from "@/services/real/comment";
import DeleteCommentDialog from "./components/confirm-delete-dialog";
import { useAppContext } from "@/contexts/app-context";
import { debounce } from "lodash";
import CommentItemSkeleton from "./components/comment-item-skeleton";

interface FilterValue {
    search?: string;
    status?: string;
    postedBy?: string;
    likes?: string;
}
interface State {
    comments?: any[];
    openDeleteDialog?: boolean;
    deletedComment?: any;
    isFiltering?: boolean;
    isFetching?: boolean;
}

type FilterField = 'search' | 'status' | 'postedBy' | 'likes';

export default function CommentPage() {
    const allComment = useRef<any[]>();
    const filteredCommentsByStatus = useRef<any[]>();
    const [filterValue, setFilterValue] = useState<FilterValue>();
    const [state, setState] = useState<State>();
    const { showAlert } = useAppContext();

    const fetchAllComments = async () => {
        const result = await getAllMyVideoComments();
        if (!result.success) return undefined;
        return result.comments;
    };

    const fetchAllCommentWithStatusFilter = async (status: 'all' | 'replied' | 'not-replied') => {
        const result = await getAllMyVideoComments(status);
        if (!result.success) return undefined;
        return result.comments;
    };

    const fetchData = async () => {
        setState({
            ...state,
            isFetching: true,
        });
        const [comments] = await Promise.all([
            fetchAllComments(),
        ]);
        allComment.current = comments;
        setState({
            ...state,
            comments: comments,
            isFetching: false,
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
            setState({ ...state, comments: allComment.current });
            return;
        }
        if (status === 'Replied') {
            filteredCommentsByStatus.current = await fetchAllCommentWithStatusFilter('replied');
            setState({ ...state, comments: filteredCommentsByStatus.current });
            return;
        }
        if (status === 'Not replied') {
            filteredCommentsByStatus.current = await fetchAllCommentWithStatusFilter('not-replied');
            setState({ ...state, comments: filteredCommentsByStatus.current });
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

    const filterPostedByValue = (comments: any[], postedBy: string): any[] => {
        return comments.filter(comment => {
            if (postedBy === 'Followers') return comment.isFollower;
            if (postedBy === 'Non-followers') return !comment.isFollower;
            return true;
        });
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
        if (postedBy) comments = filterPostedByValue(comments, postedBy);
        if (likes) comments = filterLikesValue(comments, likes);

        setState({ ...state, comments: comments, isFiltering: false });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filter();
    }, [filterValue?.search, filterValue?.status, filterValue?.postedBy, filterValue?.likes]);

    return (
        <>
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
                    {/* Page title */}
                    <Typography variant="h5" fontWeight={'bold'}>Manage and interact with comments</Typography>
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
                                onDelete={(comment) => { setState({ ...state, openDeleteDialog: true, deletedComment: comment }) }}
                            />
                        )))
                    }
                </Stack>
            </Stack>

            <DeleteCommentDialog
                open={state?.openDeleteDialog || false}
                comment={state?.deletedComment}
                onClose={() => setState({ ...state, openDeleteDialog: false, deletedComment: null })}
                onDelete={() => handleDeleteComment(state?.deletedComment?.id, state?.deletedComment?.childrenIds)}
            />
        </>
    );
}
