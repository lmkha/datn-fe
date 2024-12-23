'use client';

import { Divider, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CommentItem from "./components/comment-item";
import SelectComponent from "./components/select";
import { useEffect, useRef, useState } from "react";
import { deleteComment, getAllMyVideoComments, replyCommentInStudio, updateComment } from "@/services/real/comment";
import DeleteCommentDialog from "./components/confirm-delete-dialog";
import { useAppContext } from "@/contexts/app-context";

interface FilterValue {
    search?: string;
    status?: string;
    postedBy?: string;
    likes?: string;
}
interface State {
    comments?: any[];
    filterValue?: FilterValue;
    openDeleteDialog?: boolean;
    deletedComment?: any;
}

export default function CommentPage() {
    const allComment = useRef<any[]>();
    const [state, setState] = useState<State>();
    const { showAlert } = useAppContext();

    const fetchAllComments = async () => {
        const result = await getAllMyVideoComments();
        if (!result.success) return undefined;
        return result.comments;
    };

    const fetchData = async () => {
        const [comments] = await Promise.all([
            fetchAllComments(),
        ]);
        allComment.current = comments;
        setState({
            ...state,
            comments: comments,
        });
    };

    const updateFilterField = (field: string, value: string) => {
        setState({
            ...state,
            filterValue: {
                ...state?.filterValue,
                [field]: value,
            }
        });
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!commentId || !allComment.current || state?.comments?.length === 0) return;
        const result = await deleteComment(commentId);
        if (!result.success) {
            showAlert({ message: 'Failed to delete comment', severity: 'error' });
            return;
        }
        const updatedComments = state?.comments?.filter(comment => comment.id !== commentId);

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

    const filter = () => { };

    useEffect(() => {
        fetchData();
    }, []);

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
                            onChange={(value) => updateFilterField('status', value)}
                        />
                        <SelectComponent
                            label="Posted by"
                            options={['All', 'Followers', 'Non-followers']}
                            onChange={(value) => updateFilterField('postedBy', value)}
                        />
                        <SelectComponent
                            label="Likes"
                            options={['All', '<10', '10 - 100', '>100']}
                            onChange={(value) => updateFilterField('likes', value)}
                        />

                    </Stack>
                    <Divider />
                    {/* Comments */}
                    {state?.comments?.map((comment, index) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={handleReplyComment}
                            onUpdate={handleEditComment}
                            onDelete={(comment) => { setState({ ...state, openDeleteDialog: true, deletedComment: comment }) }}
                        />
                    ))}
                </Stack>
            </Stack>

            <DeleteCommentDialog
                open={state?.openDeleteDialog || false}
                comment={state?.deletedComment}
                onClose={() => setState({ ...state, openDeleteDialog: false, deletedComment: null })}
                onDelete={() => handleDeleteComment(state?.deletedComment?.id)}
            />
        </>
    );
}
