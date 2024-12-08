'use client';

import { get } from "@/hooks/use-local-storage";
import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UnFollowConfirmDialog from "./unfollow-dialog";


interface FollowingItemProps {
    followingUser: any;
}
export default function FollowingItem(props: FollowingItemProps) {
    const router = useRouter();
    const [openUnFollowConfirmDialog, setOpenUnFollowConfirmDialog] = useState(false);
    const [isFollowing, setIsFollowing] = useState(true);

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
                        background: isFollowing ? 'lightgray' : '#EA284E',
                        color: isFollowing ? 'black' : 'white',
                        textTransform: 'none',
                    }}
                        onClick={() => setOpenUnFollowConfirmDialog(true)}
                    >
                        <Typography variant="body1" fontWeight={'bold'}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Typography>
                    </Button>
                </Grid2>
            </Grid2>
            <UnFollowConfirmDialog
                open={openUnFollowConfirmDialog}
                onClose={() => setOpenUnFollowConfirmDialog(false)}
                username={props?.followingUser?.username}
                fullName={props?.followingUser?.fullName}
                profilePic={props?.followingUser?.profilePic}
                onConfirm={() => {
                    setIsFollowing(!isFollowing);
                }}
            />
        </>
    );
}
