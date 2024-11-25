'use client';

import { useStudioContext } from "@/contexts/studio-context";
import { Box, Button, Card, Grid2, Input, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Chip } from '@mui/material';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';

export default function UploadVideoPage() {
    const { state, dispatch } = useStudioContext();
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'Upload' });
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
                                    Andres Iniesta - The Last of his Kind - HD.mp4
                                </Typography>
                                <Stack direction={'row'} spacing={6}>
                                    {/* Size */}
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Size</Typography>
                                        <Typography fontWeight={'bold'}>1.2 GB</Typography>
                                    </Stack>
                                    {/* Duration */}
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Duration</Typography>
                                        <Typography fontWeight={'bold'}>1:30:00</Typography>
                                    </Stack>
                                </Stack>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    sx={{
                                        textTransform: 'none',
                                        width: '200px',
                                    }}
                                >
                                    <Typography>Change video</Typography>
                                </Button>
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
                        <Typography>Small video player</Typography>
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
                            <HashtagInput />
                            {/* Description */}
                            <TextField
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
                                <Typography variant="h6" fontWeight={'bold'}>Post</Typography>
                            </Button>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Stack>
        </>
    );
}

function HashtagInput() {
    const [inputValue, setInputValue] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (inputValue.trim()) {
                setHashtags((prevHashtags) => [
                    ...prevHashtags,
                    inputValue.trim()
                ]);
                setInputValue('');
            }
        }
    };

    const handleDeleteHashtag = (hashtagToDelete: string) => {
        setHashtags((prevHashtags) =>
            prevHashtags.filter((hashtag) => hashtag !== hashtagToDelete)
        );
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
                    >
                        <Typography>Create</Typography>
                    </Button>
                </Grid2>
            </Grid2>

        </Box>
    );
}
