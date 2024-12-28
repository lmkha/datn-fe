'use client';

import { Box, Button, Grid2, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getVideoByVideoId, updateVideo } from "@/services/real/video";
import VideoThumbnail from "@/core/components/video-thumbnail";
import WhoCanWatchViewSelect from "./components/privacy-select";
import PlayListSelect from "./components/playlist-select";
import HashtagInput from "./components/hashtag";
import { useAppContext } from "@/contexts/app-context";
import CircularProgressWithLabel from "@/core/components/circular-progress-with-label";

interface State {
    title?: string;
    description?: string;
    hashtags?: string[];
    thumbnailUrl?: string;
    privacy?: string;
    playlistId?: string;
    isCommentOff?: boolean;
    isFetching?: boolean;
    isSaving?: boolean;
    isSaved?: boolean;
}

export default function EditPostPage() {
    const postId = useParams().postId;
    const post = useRef<any>();
    const [state, setState] = useState<State>();
    const router = useRouter();
    const { showAlert } = useAppContext();

    const validate = () => {
        if (!state?.title) {
            showAlert({ message: 'Title is required', severity: 'error' });
            return false;
        }
        return true;
    }

    const handleSave = async () => {
        if (!validate()) return;
        setState({ ...state, isSaving: true });
        const result = await updateVideo({
            id: postId as string,
            title: state?.title as string,
            description: state?.description || '',
            tags: state?.hashtags || [],
            isPrivate: state?.privacy === 'Only me',
            isCommentOff: state?.isCommentOff || false,
        });
        if (!result.success) {
            showAlert({ message: 'Failed to save video', severity: 'error' });
            return;
        }
        showAlert({ message: 'Video saved successfully', severity: 'success' });
        setState({ ...state, isSaving: false, isSaved: true });
        setTimeout(() => {
            router.push('/studio/post');
        }, 1000);
    };

    const fetchData = async () => {
        if (!postId) return;
        const result = await getVideoByVideoId(postId as string);
        if (!result.success || !result.data) return;
        post.current = result.data;
        setState({
            title: result?.data?.title,
            description: result?.data?.description,
            hashtags: result?.data?.tags,
            thumbnailUrl: result?.data?.thumbnailUrl,
            privacy: result?.data?.isPrivate ? 'Only me' : 'Everyone',
            playlistId: result?.data?.playlistId,
            isCommentOff: result?.data?.isCommentOff
        });
    };

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
            position: 'relative',
        }}>
            {/* Header */}
            <Box sx={{
                width: '80%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: 1,
                position: 'relative',
            }}>
                <Button
                    onClick={() => router.back()}
                    sx={{
                        textTransform: 'none',
                        width: '100%',
                        color: 'black',
                        justifyContent: 'start',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                    startIcon={<ArrowBackIosIcon sx={{ fontWeight: 'bold' }} />}>
                    Back to Posts
                </Button>
            </Box>
            {/* Meta data, Thumbnail */}
            <Grid2 container direction={'row'} spacing={1} sx={{
                width: '80%',
                padding: 1,
                mt: 1,
                height: 250,
                backgroundColor: 'white',
                borderRadius: '10px',
            }}>
                {/* <Meta data */}
                <Grid2 size={8}>
                    <Stack spacing={2} sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                    }}>
                        {/* Title */}
                        <TextField
                            label='Title (required)'
                            value={state?.title || ''}
                            onChange={(e) => setState({ ...state, title: e.target.value })}
                            placeholder="Add a title that describes your video"
                            multiline={true}
                            rows={2}
                            fullWidth={true}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "1px solid lightgray",
                                    },
                                    "&:hover fieldset": {
                                        border: "1px solid black",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "2px solid black",
                                    },
                                },
                            }}
                            slotProps={{
                                input: {
                                    sx: {
                                        fontWeight: 'bold',
                                    }
                                },
                                inputLabel: {
                                    sx: {
                                        color: "gray",
                                        "&.Mui-focused": {
                                            color: "black",
                                        },
                                    }
                                },
                            }}
                        />
                        {/* HashTag */}
                        <HashtagInput
                            hashtags={state?.hashtags || []}
                            onChange={(hashtags) => setState({ ...state, hashtags })}
                        />
                        {/* Description */}
                        <TextField
                            label='Description'
                            value={state?.description || ''}
                            onChange={(e) => setState({ ...state, description: e.target.value })}
                            placeholder="Add a title that describes your video"
                            multiline={true}
                            rows={10}
                            fullWidth={true}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "1px solid lightgray",
                                    },
                                    "&:hover fieldset": {
                                        border: "1px solid black",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "2px solid black",
                                    },
                                },
                            }}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        color: "gray",
                                        "&.Mui-focused": {
                                            color: "black",
                                        },
                                    }
                                },
                            }}
                        />
                    </Stack>
                </Grid2>
                {/* Thumbnail */}
                <Grid2 size={4} sx={{
                    height: '100%',
                    backgroundColor: 'black',
                    borderRadius: '10px',
                }}>
                    <VideoThumbnail thumbnailUrl={state?.thumbnailUrl} />
                </Grid2>
            </Grid2>

            {/* Post Title, HashTag, Mention, Thumbnail, Post button */}
            <Grid2 container direction={'row'} spacing={1} sx={{
                width: '80%',
                padding: 1,
                borderRadius: '10px',
            }}>
                {/* Title, HashTag, Description */}
                <Grid2 size={8} sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: 1,
                }} />

                {/* Who can view video, Post button */}
                <Grid2 size={4} sx={{
                    backgroundColor: 'white',
                    padding: 1,
                    borderRadius: '10px',
                }}>
                    <Stack spacing={2}>
                        {/* Who can view video */}
                        <WhoCanWatchViewSelect
                            privacy={state?.privacy}
                            onChange={(privacy) => setState({ ...state, privacy })}
                            options={['Everyone', 'Only me']}
                        />
                        {/* Playlist */}
                        <PlayListSelect
                            playlistId={state?.playlistId}
                            onSelected={(playlistId) => setState({ ...state, playlistId })}
                        />
                        <Stack direction={'row'} sx={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Typography fontWeight="bold" mb={1}>
                                Allow comments
                            </Typography>
                            <Switch
                                checked={state?.isCommentOff ? false : true}
                                onChange={(e) => setState({ ...state, isCommentOff: !e.target.checked })}
                                sx={{
                                    color: 'black',
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#EA284E',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: 'pink',
                                    },
                                }}
                            />
                        </Stack>
                        {/* Submit button */}
                        <Button
                            onClick={handleSave}
                            disabled={state?.isSaving || state?.isSaved}
                            variant="contained"
                            sx={{
                                width: '100%',
                                height: '70px',
                                backgroundColor: '#EA284E',
                                color: 'white',
                                borderRadius: '10px',
                                textTransform: 'none',
                            }}
                        >
                            {state?.isSaving ?
                                (<CircularProgressWithLabel size={24} />) :
                                (<Typography variant="h6" fontWeight={'bold'}>Save</Typography>)
                            }
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </Stack>
    );
}
