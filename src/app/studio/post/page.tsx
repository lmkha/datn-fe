'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SelectComponent from "./components/select";
import PostItem from "./components/post-item";
import DeletePostConfirmDialog from "./components/confirm-delete-dialog";
import { debounce } from "lodash";
import { get } from "@/hooks/use-local-storage";
import { deleteVideo, getVideosByUserId, updateVideo } from "@/services/real/video";
import PostItemSkeleton from "./components/post-item-skeleton";
import ChangePrivacyDialog from "./components/confirm-change-privacy";
import { useAppContext } from "@/contexts/app-context";

type FilterField = 'search' | 'orderBy' | 'videoViews' | 'likes' | 'comments' | 'status' | 'privacy';

interface State {
    posts?: any[];
    openDeletePostConfirmDialog?: boolean;
    openChangePrivacyDialog?: boolean;
    deletedPost?: any;
    changePrivacyPost?: any;
    isFetching?: boolean;
    isFiltering?: boolean;
}

interface FilterValue {
    search?: string;
    orderBy?: string;
    videoViews?: string;
    likes?: string;
    comments?: string;
    status?: string;
    privacy?: string;
}

export default function PostPage() {
    const allPosts = useRef<any[]>();
    const [state, setState] = useState<State>();
    const [filterValue, setFilterValue] = useState<FilterValue>();
    const { showAlert } = useAppContext();

    const updateFilterField = (field: FilterField, value: string) => {
        setFilterValue({ ...filterValue, [field]: value });
    };

    const debounceHandleUpdateSearchValue = useCallback(
        debounce((searchValue: string) => {
            updateFilterField('search', searchValue)
        }, 500),
        []
    );

    const fetchAllPosts = async () => {
        const myUserId = get<any>('user')?.id;
        if (!myUserId) return undefined;
        const result = await getVideosByUserId(myUserId);
        if (!result.success) return undefined;
        const orderedPosts = orderPosts(result.data, 'Newest to oldest');
        return orderedPosts;
    };

    const fetchData = async () => {
        setState({ ...state, isFetching: true });
        const [posts] = await Promise.all([
            fetchAllPosts(),
        ]);
        allPosts.current = posts;
        setState({ ...state, posts: posts, isFetching: false });
    };

    const orderPosts = (posts: any[], orderBy: 'Newest to oldest' | 'Oldest to newest') => {
        if (orderBy === 'Newest to oldest') {
            return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const filterBySearch = (posts: any[], search: string) => {
        return posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
    };

    const filterByVideoViews = (posts: any[], videoViews: string) => {
        if (videoViews === '1 - 10') {
            return posts.filter((post) => post.viewsCount >= 1 && post.viewsCount <= 10);
        }
        if (videoViews === '10 - 100') {
            return posts.filter((post) => post.viewsCount >= 10 && post.viewsCount <= 100);
        }
        if (videoViews === '> 100') {
            return posts.filter((post) => post.viewsCount > 100);
        }
        return posts;
    };

    const filterByLikes = (posts: any[], likes: string) => {
        if (likes === '1 - 10') {
            return posts.filter((post) => post.likesCount >= 1 && post.likesCount <= 10);
        }
        if (likes === '10 - 100') {
            return posts.filter((post) => post.likesCount >= 10 && post.likesCount <= 100);
        }
        if (likes === '> 100') {
            return posts.filter((post) => post.likesCount > 100);
        }
        return posts;
    };

    const filterByComments = (posts: any[], comments: string) => {
        if (comments === '1 - 10') {
            return posts.filter((post) => post.commentsCount >= 1 && post.commentsCount <= 10);
        }
        if (comments === '10 - 100') {
            return posts.filter((post) => post.commentsCount >= 10 && post.commentsCount <= 100);
        }
        if (comments === '> 100') {
            return posts.filter((post) => post.commentsCount > 100);
        }
        return posts;
    };

    const filterByStatus = (posts: any[], status: string) => {
        if (status === 'Posted') {
            return posts.filter((post) => post?.isUploaded === true && post?.isProcessed === true);
        }
        if (status === 'Processing') {
            return posts.filter((post) => post?.isUploaded === true && post?.isProcessed === false);
        }
        if (status === 'Uploading') {
            return posts.filter((post) => post?.isUploaded === false);
        }
        return posts;
    };

    const filterByPrivacy = (posts: any[], privacy: string) => {
        if (privacy === 'only me') {
            return posts.filter((post) => post?.isPrivate === true);
        }
        if (privacy === 'everyone') {
            return posts.filter((post) => post?.isPrivate === false);
        }
        return posts;
    };

    const filter = () => {
        if (state?.isFiltering) return;
        if (!allPosts.current) return;

        setState({ ...state, isFiltering: true });

        let posts = allPosts.current || [];
        if (filterValue?.search) posts = filterBySearch(posts, filterValue.search);
        if (filterValue?.orderBy) posts = orderPosts(posts, filterValue.orderBy as any);
        if (filterValue?.videoViews) posts = filterByVideoViews(posts, filterValue.videoViews);
        if (filterValue?.likes) posts = filterByLikes(posts, filterValue.likes);
        if (filterValue?.comments) posts = filterByComments(posts, filterValue.comments);
        if (filterValue?.status) posts = filterByStatus(posts, filterValue.status);
        if (filterValue?.privacy) posts = filterByPrivacy(posts, filterValue.privacy);

        setTimeout(() => {
            setState({ ...state, posts, isFiltering: false });
        }, 500);
    };

    const handleChangePrivacy = async () => {
        if (!state?.changePrivacyPost?.id || !state?.changePrivacyPost?.title) return;
        const changePrivacyResult = await updateVideo({
            id: state?.changePrivacyPost?.id,
            isPrivate: !state?.changePrivacyPost?.isPrivate,
            title: state?.changePrivacyPost?.title,
            description: state?.changePrivacyPost?.description,
            isCommentOff: state?.changePrivacyPost?.isCommentOff,
            tags: state?.changePrivacyPost?.tags
        });
        if (!changePrivacyResult.success) {
            showAlert({ message: changePrivacyResult.message, severity: 'error' });
            setState({ ...state, openChangePrivacyDialog: false, changePrivacyPost: undefined });
            return;
        }
        const newPosts = state?.posts?.map((post) => {
            if (post.id === state?.changePrivacyPost?.id) {
                return { ...post, isPrivate: !post.isPrivate };
            }
            return post;
        });
        allPosts.current = newPosts;
        setState({ ...state, posts: newPosts, openChangePrivacyDialog: false, changePrivacyPost: undefined });
    };

    const handleDeletePost = async () => {
        if (!state?.deletedPost?.id) return;
        const deleteResult = await deleteVideo(state?.deletedPost?.id);
        if (!deleteResult.success) {
            showAlert({ message: deleteResult.message, severity: 'error' });
            setState({ ...state, openDeletePostConfirmDialog: false, deletedPost: undefined });
            return;
        }
        const newPosts = state?.posts?.filter((post) => post.id !== state?.deletedPost?.id);
        allPosts.current = newPosts;
        setState({ ...state, posts: newPosts, openDeletePostConfirmDialog: false, deletedPost: undefined });
        showAlert({ message: 'Delete post successfully', severity: 'success' });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filter();
    }, [filterValue]);

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
                    <Typography variant="h5" fontWeight={'bold'}>Manage your posts</Typography>
                    {/* Search title */}
                    <TextField
                        size="small"
                        placeholder="Search for posts title"
                        onChange={(e) => debounceHandleUpdateSearchValue(e.target.value)}
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
                    <Stack direction={'row'} spacing={2} sx={{
                        width: '60%',
                    }}>
                        <Box sx={{ width: '170px' }}>
                            <SelectComponent
                                label="Order by"
                                options={['Newest to oldest', 'Oldest to newest']}
                                onChange={(value) => updateFilterField('orderBy', value)}
                            />
                        </Box>
                        <SelectComponent
                            label="Video views"
                            options={['All', '1 - 10', '10 - 100', '> 100']}
                            onChange={(value) => updateFilterField('videoViews', value)}
                        />
                        <SelectComponent
                            label="Likes"
                            options={['All', '1 - 10', '10 - 100', '> 100']}
                            onChange={(value) => updateFilterField('likes', value)}
                        />
                        <SelectComponent
                            label="Comments"
                            options={['All', '1 - 10', '10 - 100', '> 100']}
                            onChange={(value) => updateFilterField('comments', value)}
                        />
                        <SelectComponent
                            label="Status"
                            options={['All', 'Posted', 'Processing', 'Uploading']}
                            onChange={(value) => updateFilterField('status', value)}
                        />
                        <SelectComponent
                            label="Privacy"
                            options={['All', 'only me', 'everyone']}
                            onChange={(value) => updateFilterField('privacy', value)}
                        />
                    </Stack>

                    <Divider />
                    {/* Post list */}
                    <Stack spacing={2}>
                        {/* Table titles */}
                        <Grid2 container direction={'row'} spacing={2}>
                            {/* Post: thumbnail, title, metrics */}
                            <Grid2 size={6}>
                                <Typography variant="body1" fontWeight={'bold'}>Post</Typography>
                            </Grid2>

                            {/* Action: edit, delete */}
                            <Grid2 size={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant="body1" fontWeight={'bold'}>Actions</Typography>
                                </Box>
                            </Grid2>

                            {/* Status info: status, last changed */}
                            <Grid2 size={2}>
                                <Typography variant="body1" fontWeight={'bold'}>Status info</Typography>
                            </Grid2>

                            {/* Privacy */}
                            <Grid2 size={2}>
                                <Typography variant="body1" fontWeight={'bold'}>Privacy</Typography>
                            </Grid2>
                        </Grid2>
                        <Divider />
                        {/* Post items */}
                        {state?.isFetching || state?.isFiltering ?
                            (Array.from({ length: 5 }).map((_, idx) => (
                                <PostItemSkeleton key={idx} />
                            ))) :
                            (state?.posts?.map((post) => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    onChangePrivacy={(post) => { setState({ ...state, openChangePrivacyDialog: true, changePrivacyPost: post }) }}
                                    onDeleteItem={() => { setState({ ...state, openDeletePostConfirmDialog: true, deletedPost: post }) }}
                                />
                            )))
                        }
                    </Stack>
                </Stack>
            </Stack>
            <DeletePostConfirmDialog
                open={state?.openDeletePostConfirmDialog || false}
                onClose={() => setState({ ...state, openDeletePostConfirmDialog: false })}
                onConfirm={handleDeletePost}
                post={state?.deletedPost}
            />
            <ChangePrivacyDialog
                open={state?.openChangePrivacyDialog || false}
                onClose={() => setState({ ...state, openChangePrivacyDialog: false, changePrivacyPost: undefined })}
                post={state?.changePrivacyPost}
                onConfirm={handleChangePrivacy}
            />
        </>
    );
}
