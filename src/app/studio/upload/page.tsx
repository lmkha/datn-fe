'use client';

import { Box, Button, Card, CircularProgress, Grid2, IconButton, Input, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useReducer } from "react";
import { Chip } from '@mui/material';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/legacy/image";
import { useRef } from 'react';
import { formatDuration, formatSize } from "@/core/logic/convert";
import { postVideo } from "@/services/real/video";

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
    thumbnail?: string;
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

    useEffect(() => {
        return () => {
            if (videoURL) {
                URL.revokeObjectURL(videoURL);
            }
        };
    }, [videoURL]);

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

    useEffect(() => {
        if (pageState?.videoFile) {
            setVideoFileMetadata(pageState.videoFile);
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
                            borderBottom: '5px solid #00C39B',
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
                            <Box sx={{
                                position: 'absolute',
                                bottom: 4,
                                right: 4,
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'end',
                            }}>
                                75% uploaded
                            </Box>
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
                            }}>
                                {/* <Typography>Thumbnail</Typography> */}
                            </Box>
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

interface VideoUploadButtonProps {
    onChange?: (file: File) => void;
}
function VideoUploadButton(props: VideoUploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.onChange?.(file);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="inherit"
                sx={{
                    textTransform: 'none',
                    width: '200px',
                }}
                onClick={handleButtonClick}
            >
                <Typography>Change video</Typography>
            </Button>

            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
        </>
    );
};
interface HashtagInputProps {
    onChange?: (hashtags: string[]) => void;
}
function HashtagInput(props: HashtagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (inputValue.trim()) {
                setHashtags((prevHashtags) => [
                    ...prevHashtags,
                    inputValue.trim()
                ]);
                props.onChange?.(
                    [...hashtags, inputValue.trim()]
                );
                setInputValue('');
            }
        }
    };

    const handleDeleteHashtag = (hashtagToDelete: string) => {
        setHashtags((prevHashtags) =>
            prevHashtags.filter((hashtag) => hashtag !== hashtagToDelete)
        );
        props.onChange?.(hashtags);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
                borderRadius: 1,
                border: '1px solid lightgray',
                "&:focus-within": {
                    border: '1px solid black',
                },
            }}
        >
            {hashtags.map((hashtag, index) => (
                <Chip
                    key={index}
                    label={`#${hashtag}`}
                    onDelete={() => handleDeleteHashtag(hashtag)}
                />
            ))}

            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Hashtags"
                disableUnderline={true}
                sx={{
                    flexGrow: 1,
                    padding: '8px',
                    borderRadius: '5px',
                }}
            />
        </Box>

    );
}

function WhoCanWatchViewSelect() {
    const [visibility, setVisibility] = React.useState('public');

    const handleChange = (event: SelectChangeEvent) => {
        setVisibility(event.target.value);
    };

    return (
        <Box>
            <Typography fontWeight="bold" mb={1}>
                Who can watch this video
            </Typography>
            <FormControl fullWidth>
                <Select
                    size="small"
                    value={visibility}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select visibility' }}
                >
                    <MenuItem value="public">Everyone</MenuItem>
                    <MenuItem value="followers">Followers</MenuItem>
                    <MenuItem value="private">Only you</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function PlayListSelect() {
    const [playlist, setPlaylist] = React.useState('');
    const [openCreateNewPlaylistModal, setOpenCreateNewPlaylistModal] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setPlaylist(event.target.value);
    };

    return (
        <Box>
            <Typography fontWeight="bold" mb={1}>
                Select Playlist
            </Typography>
            <Grid2 container spacing={1} direction={'row'} sx={{
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                <Grid2 size={9}>
                    <FormControl fullWidth>
                        <Select
                            size="small"
                            value={playlist}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select a playlist' }}
                        >
                            <MenuItem value="" disabled>
                                Choose a playlist
                            </MenuItem>
                            <MenuItem value="1">My Favorites</MenuItem>
                            <MenuItem value="2">Workout Mix</MenuItem>
                            <MenuItem value="3">Relaxing Music</MenuItem>
                            <MenuItem value="4">Top Hits</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3} height={'100%'} sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            width: 'auto',
                            height: '100%',
                        }}
                        onClick={() => setOpenCreateNewPlaylistModal(true)}
                    >
                        <Typography>Create</Typography>
                    </Button>
                </Grid2>
            </Grid2>
            <CreateNewPlayListModal
                open={openCreateNewPlaylistModal}
                onClose={() => setOpenCreateNewPlaylistModal(false)}
            />
        </Box>
    );
}
interface CreateNewPlayListModalProps {
    open: boolean;
    onClose: () => void;
}
function CreateNewPlayListModal(props: CreateNewPlayListModalProps) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 2,
                }}>
                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
                            Add New Playlist
                        </Typography>

                        <IconButton onClick={props.onClose}>
                            <CloseOutlinedIcon />
                        </IconButton>

                    </Stack>
                    {/* Playlist name */}
                    <TextField
                        size="small"
                        label="Playlist Name"
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2,
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
                    <Typography fontWeight={'bold'} mt={2}>Playlist Image</Typography>
                    {/* Playlist Image */}
                    <Box sx={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '10px',
                        border: '1px solid lightgray',
                        mt: 2,
                    }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src="/images/video-image.jpg"
                                alt="Image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: '100%',
                            height: '50px',
                            backgroundColor: '#EA284E',
                            color: 'white',
                            borderRadius: '10px',
                            textTransform: 'none',
                        }}
                    >
                        <Typography variant="h6" fontWeight={'bold'}>Create</Typography>
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}
