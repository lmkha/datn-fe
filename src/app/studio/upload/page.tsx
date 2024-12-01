'use client';

import { Box, Button, Card, CircularProgress, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import * as React from 'react';
import Image from "next/legacy/image";
import { formatDuration, formatSize } from "@/core/logic/convert";
import { postVideo } from "@/services/real/video";
import PlayListSelect from "./components/playlist-select";
import VideoUploadButton from "./components/video-upload-button";
import HashtagInput from "./components/hashtag-input";
import WhoCanWatchViewSelect from "./components/who-can-see-select";
import ThumbnailUploadButton from "./components/thumbnail-upload-button";

interface VideoFileMetadata {
    size?: string;
    duration?: string;
}

interface PageState {
    isUploading?: boolean;
    title?: string;
    description?: string;
    hashtags?: string[];
    visibility?: string;
    playlist?: string;
    thumbnailFile?: File;
    videoFile?: File;
    success?: boolean;
}

export default function UploadVideoPage() {
    const [pageState, setPageState] = useState<PageState>();
    const [videoMetadata, setVideoMetadata] = useState<VideoFileMetadata>();

    const videoURL = useMemo(() => {
        if (pageState?.videoFile) {
            return URL.createObjectURL(pageState.videoFile);
        }
        return null;
    }, [pageState?.videoFile]);

    const thumbnailURL = useMemo(() => {
        if (pageState?.thumbnailFile) {
            return URL.createObjectURL(pageState.thumbnailFile);
        }
        return null;
    }, [pageState?.thumbnailFile]);

    useEffect(() => {
        return () => {
            if (videoURL) {
                URL.revokeObjectURL(videoURL);
            }
        };
    }, [videoURL]);

    useEffect(() => {
        return () => {
            if (thumbnailURL) {
                URL.revokeObjectURL(thumbnailURL);
            }
        };
    }, [thumbnailURL]);

    const setVideoFileMetadata = (file: File) => {
        const videoURL = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = videoURL;

        video.onloadedmetadata = () => {
            const formattedDuration = formatDuration(video.duration);
            const formattedSize = formatSize(file.size);

            setVideoMetadata({
                size: formattedSize,
                duration: formattedDuration,
            });

            URL.revokeObjectURL(videoURL);
        };

        video.onerror = () => {
            console.error('Error loading video metadata');
        };
    };

    const setThumbnailFileMetadata = (file: File) => {
        const thumbnailURL = URL.createObjectURL(file);
        const image = document.createElement('img');
        image.src = thumbnailURL;

        image.onload = () => {
            URL.revokeObjectURL(thumbnailURL);
        };

        image.onerror = () => {
            console.error('Error loading thumbnail metadata');
        }
    }

    useEffect(() => {
        if (pageState?.videoFile) {
            setVideoFileMetadata(pageState.videoFile);
        }
        if (pageState?.thumbnailFile) {
            setThumbnailFileMetadata(pageState.thumbnailFile);
        }
    }, [pageState]);

    const handleUpload = async () => {
        setPageState({ ...pageState, isUploading: true });
        postVideo({
            title: pageState?.title || '',
            isPrivate: pageState?.visibility === 'private',
            file: pageState?.videoFile || new File([], ''),
            description: pageState?.description,
            tags: pageState?.hashtags,
        }).then((response) => {
            setPageState({ ...pageState, isUploading: false, success: response.success });
        })
    };

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
                position: 'relative',
            }}>
                {/* Meta data, preview video player */}
                <Grid2 container direction={'row'} spacing={1} sx={{
                    width: '80%',
                    padding: 1,
                    mt: 1,
                    height: '200px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                }}>
                    {/* <Meta data */}
                    <Grid2 size={8}>
                        <Card sx={{
                            height: '100%',
                            borderRadius: '10px',
                            position: 'relative',
                        }}>
                            <Stack spacing={2} padding={1}>
                                {/* file name */}
                                <Typography variant="h5" fontWeight={'bold'}>
                                    {pageState?.videoFile?.name || 'No file selected'}
                                </Typography>
                                <Stack direction={'row'} spacing={6}>
                                    {/* Size */}
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Size</Typography>
                                        <Typography fontWeight={'bold'}>{videoMetadata?.size || ''}</Typography>
                                    </Stack>
                                    {/* Duration */}
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Duration</Typography>
                                        <Typography fontWeight={'bold'}>{videoMetadata?.duration || ''}</Typography>
                                    </Stack>
                                </Stack>
                                <VideoUploadButton onChange={(file) => setPageState({ ...pageState, videoFile: file })} />
                            </Stack>
                        </Card>
                    </Grid2>

                    {/* Preview video player */}
                    <Grid2 size={4} sx={{
                        height: '100%',
                        backgroundColor: 'black',
                        borderRadius: '10px',
                    }}>
                        {videoURL && (
                            <video
                                src={videoURL}
                                controls
                                autoPlay={true}
                                width="100%"
                                height="100%"
                                className="rounded-lg"
                            />
                        )}
                    </Grid2>
                </Grid2>
                {/* </Paper> */}

                {/* Post Title, HashTag, Mention, Thumbnail, Post button */}
                <Grid2 container direction={'row'} spacing={1} sx={{
                    width: '80%',
                    padding: 1,
                    backgroundColor: 'white',
                    borderRadius: '10px',
                }}>
                    {/* Title, HashTag, Description */}
                    <Grid2 size={8}>
                        <Stack spacing={2} sx={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                        }}>
                            {/* Title */}
                            <TextField
                                onChange={(e) => setPageState({ ...pageState, title: e.target.value })}
                                label='Title (required)'
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
                            <HashtagInput onChange={(hashtags) => setPageState({ ...pageState, hashtags: hashtags })} />
                            {/* Description */}
                            <TextField
                                onChange={(e) => setPageState({ ...pageState, description: e.target.value })}
                                label='Description'
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

                    {/* Thumbnail, who can view video, Post button */}
                    <Grid2 size={4}>
                        <Stack spacing={2}>
                            {/* Thumbnail */}
                            <Box sx={{
                                width: '100%',
                                height: '170px',
                                backgroundColor: 'black',
                                borderRadius: '10px',
                                border: '1px solid lightgray',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                {thumbnailURL && (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={thumbnailURL}
                                        alt="Thumbnail"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </Box>
                            {/* Set thumbnail button */}
                            <ThumbnailUploadButton onChange={(file) => setPageState({ ...pageState, thumbnailFile: file })} />
                            {/* Who can view video */}
                            <WhoCanWatchViewSelect />
                            {/* Playlist */}
                            <PlayListSelect />
                            {/* Submit button */}
                            <Button
                                onClick={handleUpload}
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    height: '70px',
                                    backgroundColor: '#EA284E',
                                    color: 'white',
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                disabled={pageState?.isUploading || pageState?.success}
                            >
                                {pageState?.isUploading ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: 'white',
                                        }}
                                    />
                                ) : (
                                    <Typography variant="h6" fontWeight={'bold'}>
                                        {pageState?.success ? 'Post successfully' : 'Post'}
                                    </Typography>
                                )}
                            </Button>

                        </Stack>
                    </Grid2>
                </Grid2>
            </Stack>
        </>
    );
}
