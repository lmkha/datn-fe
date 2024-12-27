'use client';

import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import VideoThumbnail from "@/core/components/video-thumbnail";
import { formatNumberToShortText } from "@/core/logic/format";


interface ChangePrivacyDialogProps {
    open: boolean;
    post?: any;
    onClose: () => void;
    onConfirm: () => void;
}
export default function ChangePrivacyDialog(props: ChangePrivacyDialogProps) {
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
                <Typography variant="body1" fontWeight={'bold'}>
                    Confirm update privacy to {props?.post?.isPrivate ? 'Everyone' : 'Only me'} for this post?
                </Typography>
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
                        <VideoThumbnail thumbnailUrl={props?.post?.thumbnailUrl} />
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
                                {props?.post?.title}
                            </Typography>
                            {/* Metrics */}
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'} >
                                    <PlayArrowOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.viewsCount)}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.likesCount)}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography variant="body2">{formatNumberToShortText(props?.post?.commentsCount)}</Typography>
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
                    onClick={props.onConfirm}
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
                    <Typography variant="body1" fontWeight={'bold'}>Change</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
