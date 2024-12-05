'use client';

import { get } from "@/hooks/use-local-storage";
import { getAllFollowings } from "@/services/real/user";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageState {
    followingUsers: any[];
}
export default function FollowingPage() {
    const [state, setState] = useState<PageState>({
        followingUsers: [],
    });

    const fetchData = async () => {
        getAllFollowings().then((result) => {
            if (result.success && result.followingUsers) {
                console.log(result.followingUsers);
                setState({
                    ...state,
                    followingUsers: result.followingUsers,
                });
            }
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
                {state.followingUsers.map((followingUser) => (
                    <FollowingItem key={followingUser.username} followingUser={followingUser} />
                ))}
            </Stack>
        </Stack>
    );
}

interface FollowingItemProps {
    followingUser: any;
}
function FollowingItem(props: FollowingItemProps) {
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
                    {props.followingUser?.profilePic ?
                        (<Box sx={{
                            height: '100%',
                            width: 'auto',
                            aspectRatio: '1',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            <CldImage
                                fill={true}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                                src={props.followingUser?.profilePic}
                                alt="Image"
                            />
                        </Box>) :
                        (<Avatar
                            alt="Avt"
                            src="/images/avatar.png"
                            sx={{
                                height: '100%',
                                width: 'auto',
                                aspectRatio: '1',
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push(`/@${get('user').username}`)}
                        />)}
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography variant="h6" fontWeight={'bold'} onClick={() => router.push('/@lmkha')} sx={{
                            cursor: 'pointer',
                        }}>{props.followingUser?.fullName || 'Full Name'}</Typography>
                        {/* Username */}
                        <Typography variant="h6" onClick={() => router.push(`/@${props.followingUser?.username}`)} sx={{
                            cursor: 'pointer',
                        }}>@{props.followingUser?.username || 'username'}</Typography>
                        {/* Bio */}
                        <Typography variant="body1">I'm a the best developer!</Typography>
                        {/* Metrics */}
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{props.followingUser?.followerCount || 0}</Typography>
                                <Typography variant="body1" color="textSecondary">Followers</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{props.followingUser?.followingCount || 0}</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
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
            <UnFollowConfirmDialog
                open={openUnFollowConfirmDialog}
                onClose={() => setOpenUnFollowConfirmDialog(false)}
                username={props?.followingUser?.username}
                fullName={props?.followingUser?.fullName}
                profilePic={props?.followingUser?.profilePic}
            />
        </>
    );
}

interface UnFollowConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    username: string;
    fullName: string;
    profilePic: string;
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