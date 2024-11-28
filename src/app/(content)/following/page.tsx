'use client';

import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FollowingPage() {
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
                justifyContent: 'center',
            }}>
                {/* Page title */}
                <Typography variant="h5" fontWeight={'bold'}>All Following</Typography>
                <Divider />
                {/* Following list */}
                <FollowingItem />
                <FollowingItem />
                <FollowingItem />
                <FollowingItem />
                <FollowingItem />
                <FollowingItem />
            </Stack>
        </Stack>
    );
}

function FollowingItem() {
    const router = useRouter();
    const [openUnFollowConfirmDialog, setOpenUnFollowConfirmDialog] = useState(false);

    return (
        <>
            <Grid2 container direction={'row'} sx={{
                height: '120px',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
                padding: 1
            }}>
                {/* Avatar */}
                <Grid2 size={2} height={'100%'}>
                    <Avatar
                        alt="Avt"
                        src="/images/avatar.jpg"
                        sx={{
                            height: '100%',
                            width: 'auto',
                            aspectRatio: '1',
                            cursor: 'pointer',
                        }}
                        onClick={() => router.push('/@lmkha')}
                    />
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography variant="h6" fontWeight={'bold'} onClick={() => router.push('/@lmkha')} sx={{
                            cursor: 'pointer',
                        }}>Lê Minh Kha</Typography>
                        {/* Username */}
                        <Typography variant="h6" onClick={() => router.push('/@lmkha')} sx={{
                            cursor: 'pointer',
                        }}>@lmkha</Typography>
                        {/* Bio */}
                        <Typography variant="body1">I'm a the best developer!</Typography>
                        {/* Metrics */}
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">27</Typography>
                                <Typography variant="body1" color="textSecondary">Likes</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid2>
                {/* UnFollow button */}
                <Grid2 size={2}>
                    <Button sx={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: 'lightgray',
                        color: 'black',
                        textTransform: 'none',
                    }}
                        onClick={() => setOpenUnFollowConfirmDialog(true)}
                    >
                        <Typography variant="body1" fontWeight={'bold'}>Unfollow</Typography>
                    </Button>
                </Grid2>
            </Grid2>
            <UnFollowConfirmDialog open={openUnFollowConfirmDialog} onClose={() => setOpenUnFollowConfirmDialog(false)} />
        </>
    );
}

interface UnFollowConfirmDialogProps {
    open: boolean;
    onClose: () => void;
}
function UnFollowConfirmDialog(props: UnFollowConfirmDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction={'row'} alignItems={'end'} spacing={1}>
                    <Typography>UnFollow</Typography>
                    <Typography variant="body1" fontWeight={'bold'}>Lê Minh Kha</Typography>
                    <Typography>?</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to unfollow Lê Minh Kha?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
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
                    <Typography variant="body1" fontWeight={'bold'}>Unfollow</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}