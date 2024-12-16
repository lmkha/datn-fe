'use client';

import { Avatar, Box, Button, Divider, Grid2, IconButton, InputLabel, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Chip from '@mui/material/Chip';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

export default function CommentDetailPage() {
    const router = useRouter();

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
                    onClick={() => router.back()}
                    sx={{
                        textTransform: 'none',
                        color: 'black',
                        justifyContent: 'start',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                    startIcon={<ArrowBackIosIcon sx={{ fontWeight: 'bold' }} />}>
                    Back to all comments
                </Button>

                {/* Current comment, post info */}
                <Box sx={{
                    width: '100%',
                    height: '300px',
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                }}>
                    <Grid2 container direction={'row'} height={'100%'}>
                        <Grid2 size={4} padding={1}>
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
                        <Grid2 size={8}>
                            {/* Title, metrics, reply input */}
                            <Grid2 size={8} height={'100%'} width={'100%'} padding={1}>
                                <Stack sx={{ justifyContent: 'space-between', height: '100%', width: '100%' }}>
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
                                            <Stack direction={'row'}>
                                                <ShortcutIcon />
                                                <Typography variant="body2">1000</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    {/* Reply input */}
                                    <TextField
                                        label='Reply'
                                        placeholder="Reply to this comment"
                                        multiline={true}
                                        rows={5}
                                        fullWidth={true}
                                        variant="outlined"
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: <IconButton>
                                                    <SendIcon />
                                                </IconButton>,
                                                sx: {
                                                    borderRadius: '10px',
                                                    backgroundColor: '#F8F8F8',
                                                }
                                            }
                                        }}
                                    />
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
                    {/* Date picker */}

                </Stack>
                <Divider />
                {/* Comments */}
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />

            </Stack>
        </Stack>
    );
}

interface SelectComponentProps {
    label: string;
    options: string[];
    // value: string;
    // onChange: (value: string) => void;
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

function CommentItem() {
    const [openReply, setOpenReply] = useState(false);
    return (
        <>
            <Grid2 container direction={'row'} spacing={2} sx={{
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                {/* Comment */}
                <Grid2 size={7} sx={{
                    height: '100%',
                }}>
                    {/* Comment info */}
                    <Grid2 container height={'100%'}>
                        {/* Avatar */}
                        <Grid2 size={1}>
                            <Avatar
                                alt="Avt"
                                src="/images/avatar.png"
                                sx={{
                                    width: 'auto',
                                    aspectRatio: '1',
                                }}
                            />
                        </Grid2>
                        {/* username, content, metrics, reply textField */}
                        <Grid2 size={11}>
                            <Stack height={'100%'} justifyContent={'space-between'} display={'flex'}>
                                <Box>
                                    {/* Username */}
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography variant="body1" fontWeight={'bold'}>Username</Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#EA284E', }}
                                        >Follower
                                        </Typography>
                                    </Stack>
                                    {/* Content */}
                                    <Typography
                                        variant="body2"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: 2,
                                            whiteSpace: 'normal',
                                        }}
                                    >This is the best video that I had watched</Typography>
                                </Box>
                                {/* Metrics */}
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Typography variant="body2" color="textSecondary">10 days ago</Typography>
                                    <Button
                                        onClick={() => setOpenReply(!openReply)}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            color: '#EA284E',
                                        }}
                                        startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontWeight: 'bold' }} />}>
                                        Reply
                                    </Button>
                                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon />
                                        </IconButton>
                                        <Typography variant="body2" color="textSecondary">100</Typography>
                                    </Stack>
                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            color: 'gray'
                                        }}
                                        startIcon={<DeleteForeverOutlinedIcon sx={{ fontWeight: 'bold' }} />}>
                                        Delete
                                    </Button>
                                </Stack>
                                {/* Reply input */}
                                {openReply && (
                                    <TextField
                                        size="small"
                                        placeholder="Reply to this comment"
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: <IconButton>
                                                    <SendIcon />
                                                </IconButton>,
                                                sx: {
                                                    borderRadius: '10px',
                                                    backgroundColor: '#E0E0E0',
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </Stack>

                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Divider />
        </>
    );
}