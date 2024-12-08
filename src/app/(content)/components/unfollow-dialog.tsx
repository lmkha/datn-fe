'use client';

import { unFollowUser } from "@/services/real/user";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";

interface UnFollowConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    username: string;
    fullName: string;
    profilePic: string;
    onConfirm: (success: boolean) => void;
}
export default function UnFollowConfirmDialog(props: UnFollowConfirmDialogProps) {
    const handleUnFollow = async () => {
        unFollowUser({ username: props.username }).then((result) => {
            if (result.success) {
                props.onConfirm(true);
            }
        });
    };

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
                    <Typography variant="body1" fontWeight={'bold'}>{props?.username}</Typography>
                    <Typography>?</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}>
                    Are you sure you want to unfollow
                    <Typography fontWeight={'bold'} sx={{ display: 'inline' }}> {props.username || 'username'} ({props.fullName || 'full name'})</Typography>?

                    <Box sx={{
                        pt: 2,
                        height: 150,
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}>
                        {props?.profilePic ?
                            (<CldImage
                                width={150}
                                height={150}
                                style={{
                                    objectFit: 'cover',
                                    height: '100%',
                                    borderRadius: '10px',
                                }}
                                src={props?.profilePic}
                                alt="Image"
                            />) :
                            (<Avatar
                                alt="Avt"
                                src="/images/avatar.png"
                                sx={{
                                    height: 150,
                                    width: 150,
                                }}
                            />)}
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
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
                    onClick={handleUnFollow}
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