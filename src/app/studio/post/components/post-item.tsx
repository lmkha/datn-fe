'use client';

import React from "react";
import { Grid2, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Chip from '@mui/material/Chip';
import { useRouter } from "next/navigation";
import { InputLabel } from "@mui/material";
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import VideoThumbnail from "@/core/components/video-thumbnail";
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/format";
import { get } from "@/hooks/use-local-storage";


interface PostItemProps {
    post?: any;
    onDeleteItem?: (deletedPost: any) => void;
    onChangePrivacy?: (post: any) => void;
}
export default function PostItem(props: PostItemProps) {
    const router = useRouter();
    const myUsername = get<any>('user')?.username;

    const getStatus = () => {
        if (!props?.post) return '';
        if (!props?.post?.isUploaded) return 'Uploading';
        if (!props?.post?.isProcessed) return 'Processing';
        return 'Posted';
    };

    const status = getStatus();

    const handleChangePrivacy = (privacy: string) => {
        if (props?.post?.isPrivate && privacy === 'Everyone') {
            props.onChangePrivacy && props.onChangePrivacy(props.post);
        } else if (!props?.post?.isPrivate && privacy === 'Only me') {
            props.onChangePrivacy && props.onChangePrivacy(props.post);
        };
    };

    return (
        <Grid2 container direction={'row'} spacing={2} sx={{
            borderRadius: '10px',
            border: '1px solid #E0E0E0',
            height: 150,
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
                        <VideoThumbnail
                            thumbnailUrl={props?.post?.thumbnailUrl}
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                props?.post?.id && myUsername && router.push(`/@${myUsername}/videos/${props.post.id}`);
                            }}
                        />
                    </Grid2>

                    {/* Title, metrics */}
                    <Grid2 size={8}>
                        <Stack sx={{
                            justifyContent: 'space-between',
                            height: '100%',
                            padding: 1
                        }}>
                            {/* Title, description */}
                            <Stack>
                                <Typography variant="h6" fontWeight={'bold'}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        props?.post?.id && myUsername && router.push(`/@${myUsername}/videos/${props.post.id}`);
                                    }}
                                >
                                    {props?.post?.title}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        color: '#6E6E6E',
                                    }}
                                >
                                    {props?.post?.description}
                                </Typography>

                            </Stack>
                            {/* Metrics */}
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'} sx={{
                                    gap: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <PlayArrowOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.viewsCount)}</Typography>
                                </Stack>
                                <Stack direction={'row'} sx={{
                                    gap: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.likesCount)}</Typography>
                                </Stack>
                                <Stack direction={'row'} sx={{
                                    gap: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.commentsCount)}</Typography>
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
                            props?.post?.id && router.push(`/studio/post/${props.post.id}/comments`);
                        }}>
                            <ChatBubbleOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit post">
                        <IconButton onClick={() => {
                            props?.post?.id && router.push(`/studio/post/${props.post.id}/edit`);
                        }}>
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
                        label={status}
                        sx={{
                            backgroundColor:
                                status === 'Posted' ? '#E6F7F1' :
                                    status === 'Processing' ? '#E3F2FD' :
                                        '#FFF3E0',
                            color:
                                status === 'Posted' ? '#4FAB7E' :
                                    status === 'Processing' ? '#42A5F5' :
                                        '#FB8C00',
                            fontWeight: 'bold',
                        }}
                    />

                    <Typography variant="body2">{formatTimeToShortText(props?.post?.createdAt)}</Typography>
                </Stack>
            </Grid2>

            {/* Privacy */}
            <Grid2 size={2}>
                <PrivacySelect
                    label=""
                    value={props?.post?.isPrivate ? 'Only me' : 'Everyone'}
                    onChange={handleChangePrivacy}
                    options={['Everyone', 'Only me']}
                />
            </Grid2>
        </Grid2>
    );
}

interface PrivacySelectProps {
    label: string;
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
}
function PrivacySelect(props: PrivacySelectProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        if (props.onChange) {
            props.onChange(event.target.value);
        }
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
                value={props.value || ''}
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
