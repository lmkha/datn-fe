'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UnFollowConfirmDialog from "../../components/unfollow-dialog";
import { followUser, isFollowing } from "@/services/real/user";
import { get } from "@/hooks/use-local-storage";

interface State {
    isFollowing?: boolean;
    openUnFollowConfirmDialog: boolean;
}
interface FollowingItemProps {
    followingUser: any;
}
export default function FollowingItem(props: FollowingItemProps) {
    const router = useRouter();
    const currentUser = get('user');
    const [state, setState] = useState<State>({ openUnFollowConfirmDialog: false });

    const fetchData = async () => {
        props?.followingUser?.username && isFollowing({ username: props?.followingUser?.username }).then((result) => {
            if (result.success) {
                setState((prev) => ({ ...prev, isFollowing: result.isFollowing }));
            } else {
                setState((prev) => ({ ...prev, isFollowing: false }));
            }
        });
    };

    const handleFollow = async () => {
        if (!props.followingUser?.username) return;
        if (state.isFollowing) {
            setState({ ...state, openUnFollowConfirmDialog: true });
        } else {
            followUser({ username: props.followingUser?.username }).then((result) => {
                if (result.success) {
                    setState({ ...state, isFollowing: true });
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                            onClick={() => {
                                props.followingUser?.username && router.push(`/@${props.followingUser?.username}`);
                            }}
                        />)}
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                            onClick={() => {
                                props.followingUser?.username && router.push(`/@${props.followingUser?.username}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {props.followingUser?.fullName || 'Full Name'}
                        </Typography>
                        {/* Username */}
                        <Typography
                            variant="h6"
                            onClick={() => router.push(`/@${props.followingUser?.username}`)}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            @{props.followingUser?.username || 'username'}
                        </Typography>
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
                    {props.followingUser?.username !== currentUser?.username && (
                        <Button sx={{
                            width: '100%',
                            height: '50px',
                            background: state?.isFollowing ? 'lightgray' : '#EA284E',
                            color: state?.isFollowing ? 'black' : 'white',
                            textTransform: 'none',
                        }}
                            onClick={handleFollow}
                        >
                            <Typography variant="body1" fontWeight={'bold'}>
                                {state?.isFollowing ? 'Unfollow' : 'Follow'}
                            </Typography>
                        </Button>
                    )}

                </Grid2>
            </Grid2>
            <UnFollowConfirmDialog
                open={state.openUnFollowConfirmDialog}
                onClose={() => setState({ ...state, openUnFollowConfirmDialog: false })}
                username={props?.followingUser?.username}
                fullName={props?.followingUser?.fullName}
                profilePic={props?.followingUser?.profilePic}
                onConfirm={(success) => {
                    if (success) {
                        setState({
                            ...state,
                            isFollowing: false,
                            openUnFollowConfirmDialog: false
                        });
                    }
                }}
            />
        </>
    );
}
