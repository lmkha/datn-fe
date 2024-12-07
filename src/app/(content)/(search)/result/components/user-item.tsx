'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatNumberToShortText } from "@/core/logic/convert";
import { CldImage } from "next-cloudinary";
import { followUser, unFollowUser } from "@/services/real/user";

interface UserItemProps {
    user: any;
}
export default function UserItem(props: UserItemProps) {
    const router = useRouter();
    const [followed, setFollowed] = useState<boolean>(false);
    const followingCount = parseInt(props?.user?.followingCount) || 0;
    const followersCount = parseInt(props?.user?.followerCount) || 0;

    const handleFollow = async () => {
        followUser(props?.user?.username).then((res) => {
            if (res.success) {
                setFollowed(true);
            }
        });
    };
    const handleUnFollow = async () => {
        unFollowUser(props?.user?.username).then((res) => {
            if (res.success) {
                setFollowed(false);
            }
        });
    };

    const handleFollowClick = () => {
        if (followed) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    };

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
                    {props?.user?.profilePic ?
                        (<Box sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                            onClick={(e) => {
                                props?.user?.username && router.push(`/@${props.user.username}`);
                                e.stopPropagation();
                            }}
                        >
                            <CldImage
                                fill={true}
                                style={{
                                    objectFit: 'cover',
                                }}
                                src={props.user.profilePic}
                                alt="Image"
                            />
                        </Box>) :
                        (<Avatar
                            src="/images/avatar.png"
                            alt="avatar"
                            sx={{
                                width: 100,
                                height: 100,
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                props?.user?.username && router.push(`/@${props.user.username}`);
                                e.stopPropagation();
                            }}
                        />)}
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography variant="h6" fontWeight={'bold'}
                            onClick={() => {
                                props?.user?.username && router.push(`/@${props.user.username}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}>{props?.user?.fullName}</Typography>
                        {/* Username */}
                        <Typography variant="h6"
                            onClick={() => {
                                props?.user?.username && router.push(`/@${props.user.username}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}>@{props?.user?.username}</Typography>
                        {/* Bio */}
                        <Typography variant="body1">I'm a the best developer!</Typography>
                        {/* Metrics */}
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{formatNumberToShortText(followersCount)} </Typography>
                                <Typography variant="body1" color="textSecondary">Followers</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{formatNumberToShortText(followingCount)} </Typography>
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
                        backgroundColor: followed ? 'lightgray' : '#EA284E',
                        color: followed ? 'black' : 'white',
                        textTransform: 'none',
                    }}
                        onClick={handleFollowClick}
                    >
                        <Typography variant="body1" fontWeight={'bold'}>
                            {followed ? 'Unfollow' : 'Follow'}
                        </Typography>
                    </Button>
                </Grid2>
            </Grid2>
        </>
    );
}