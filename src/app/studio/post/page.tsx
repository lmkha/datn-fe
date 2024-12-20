'use client';

import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, IconButton, InputLabel, Stack, TextField, Tooltip, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Chip from '@mui/material/Chip';
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

export default function PostPage() {
    const router = useRouter();
    const [openDeletePostConfirmDialog, setOpenDeletePostConfirmDialog] = useState(false);

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
                            />
                        </Box>
                        <SelectComponent
                            label="Video views"
                            options={['All', '< 1000', '1K - 10K', '10K - 100K', '> 100K']}
                        />
                        <SelectComponent
                            label="Likes"
                            options={['All', '< 1000', '1K - 10K', '10K - 100K', '> 100K']}
                        />
                        <SelectComponent
                            label="Comments"
                            options={['All', '< 1000', '1K - 10K', '10K - 100K', '> 100K']}
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
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />
                        <PostItem onDeleteItem={() => { setOpenDeletePostConfirmDialog(true) }} />

                    </Stack>
                </Stack>
            </Stack>
            <DeletePostConfirmDialog
                open={openDeletePostConfirmDialog}
                onClose={() => setOpenDeletePostConfirmDialog(false)}
            />
        </>
    );
}

interface SelectComponentProps {
    label: string;
    options: string[];
}
function SelectComponent(props: SelectComponentProps) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 140,
                borderRadius: '10px',
                '.MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#F8F8F8',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    borderRadius: '10px',
                },
            }}
        >
            <InputLabel id={props.label}>{props.label}</InputLabel>
            <Select
                sx={{
                    borderRadius: '10px',
                    backgroundColor: '#F8F8F8',
                    '.MuiSelect-select': {
                        borderRadius: '10px',
                    },
                }}
                labelId={props.label}
                value={selectedValue}
                onChange={handleChange}
                label={props.label}
                id="order-by-select"
            >
                {props.options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            '&.Mui-focusVisible': {
                                outline: 'none',
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}

interface PostItemProps {
    onDeleteItem: () => void;
}
function PostItem(props: PostItemProps) {
    const router = useRouter();

    return (
        <Grid2 container direction={'row'} spacing={2} sx={{
            borderRadius: '10px',
            border: '1px solid #E0E0E0',
            height: '100px',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Post: thumbnail, title, metrics */}
            <Grid2 size={6} height={'100%'}>
                <Grid2 container direction={'row'} spacing={1} height={'100%'}>
                    {/* Thumbnail */}
                    <Grid2 size={4} sx={{
                        height: '100%',
                        backgroundColor: 'black',
                        borderRadius: '10px',
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
                    </Grid2>

                    {/* Title, metrics */}
                    <Grid2 size={8}>
                        <Stack sx={{ justifyContent: 'space-between', height: '100%' }}>
                            {/* Title */}
                            <Typography variant="body1" fontWeight={'bold'}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                This is the title of the post that is very long and should be truncated
                            </Typography>
                            {/* Metrics */}
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'} >
                                    <PlayArrowOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Grid2>

            {/* Action: edit, delete */}
            <Grid2 size={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                    <Tooltip title="Comments">
                        <IconButton onClick={() => {
                            router.push('/studio/post/tempPostId/comments');
                        }}>
                            <ChatBubbleOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit post">
                        <IconButton onClick={() => router.push('/studio/post/tempPostId/edit')}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete post" onClick={props.onDeleteItem}>
                        <IconButton>
                            <DeleteForeverOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Grid2>

            {/* Status info: status, last changed */}
            <Grid2 size={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Chip
                        label="Posted"
                        sx={{
                            backgroundColor: '#E6F7F1',
                            color: '#4FAB7E',
                            fontWeight: 'bold',
                        }}
                    />
                    <Typography variant="body2">2 days ago</Typography>
                </Stack>
            </Grid2>

            {/* Privacy */}
            <Grid2 size={2}>
                {/* <Typography variant="body2">Privacy</Typography> */}
                <SelectComponent
                    label=""
                    options={['Everyone', 'Only me', 'Followers']}
                />
            </Grid2>
        </Grid2>
    );
}

interface DeletePostConfirmDialogProps {
    open: boolean;
    onClose: () => void;
}
function DeletePostConfirmDialog(props: DeletePostConfirmDialogProps) {
    return (
        <Dialog
            sx={{
                height: 'auto',
                width: 'auto',
            }}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="body1" fontWeight={'bold'}>Are you sure you want to delete this post?</Typography>
            </DialogTitle>
            <DialogContent sx={{
                width: '500px',
                height: 'auto',
                padding: '20px',
            }}>
                {/* Post: thumbnail, title, metrics */}
                <Grid2 container direction={'row'} spacing={1} sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '10px',
                }}>
                    {/* Thumbnail */}
                    <Grid2 size={4} sx={{
                        height: '100%',
                        backgroundColor: 'black',
                        borderRadius: '10px',
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
                    </Grid2>

                    {/* Title, metrics */}
                    <Grid2 size={8}>
                        <Stack sx={{
                            justifyContent: 'space-between',
                            height: '100%',
                            width: '100%',
                        }}>
                            {/* Title */}
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '100%',
                                }}
                            >
                                This is the title of the post that is very long and should be truncated
                            </Typography>
                            {/* Metrics */}
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'} >
                                    <PlayArrowOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography variant="body2">1000</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'space-between',
            }}>
                <Button
                    onClick={props.onClose}
                    color="inherit"
                    autoFocus
                    variant="outlined"
                    sx={{
                        width: '40%',
                        height: '50px',
                        color: 'black',
                        borderRadius: '10px',
                        textTransform: 'none',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>Cancel</Typography>
                </Button>
                <Button
                    onClick={props.onClose}
                    autoFocus
                    variant="contained"
                    sx={{
                        width: '40%',
                        height: '50px',
                        backgroundColor: '#EA284E',
                        color: 'white',
                        borderRadius: '10px',
                        textTransform: 'none',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>Delete</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
