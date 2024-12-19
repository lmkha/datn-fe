'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UnFollowConfirmDialog from "../../components/unfollow-dialog";
import { followUser, isFollowing } from "@/services/real/user";
import { get } from "@/hooks/use-local-storage";
import UserAvatar from "@/core/components/avatar";

interface State {
    isFollowing?: boolean;
    openUnFollowConfirmDialog?: boolean;
    followingUser?: any;
}
interface FollowingItemProps {
    followingUser: any;
}
export default function FollowingItem(props: FollowingItemProps) {
    const router = useRouter();
    const currentUser = get('user');
    const [state, setState] = useState<State>({ openUnFollowConfirmDialog: false });

    const fetchData = async () => {
        if (!props?.followingUser?.username) return;
        const result = await isFollowing({ username: props?.followingUser?.username });
        if (result.success) {
            setState((prev) => ({
                ...prev,
                isFollowing: result.isFollowing,
                followingUser: props.followingUser
            }));
        } else {
            setState((prev) => ({
                ...prev,
                isFollowing: false,
                followingUser: props.followingUser
            }));
        }
    };

    const handleFollow = async () => {
        if (!state?.followingUser?.username) return;
        if (state.isFollowing) {
            setState({ ...state, openUnFollowConfirmDialog: true });
        } else {
            const result = await followUser({ username: state?.followingUser?.username });
            if (result.success) {
                setState({
                    ...state,
                    isFollowing: true,
                    followingUser: {
                        ...state.followingUser,
                        followerCount: state.followingUser?.followerCount + 1
                    }
                });
            }
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
                    <UserAvatar src={state?.followingUser?.profilePic} size={100}
                        onClick={() => {
                            state?.followingUser?.username && router.push(`/@${state?.followingUser?.username}`);
                        }}
                        sx={{
                            cursor: 'pointer'
                        }}
                    />
                </Grid2>
                {/* Info */}
                <Grid2 size={8}>
                    <Stack>
                        {/* FullName */}
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                            onClick={() => {
                                state?.followingUser?.username && router.push(`/@${state?.followingUser?.username}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {state?.followingUser?.fullName || 'Full Name'}
                        </Typography>
                        {/* Username */}
                        <Typography
                            variant="h6"
                            onClick={() => router.push(`/@${state?.followingUser?.username}`)}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            @{state?.followingUser?.username || 'username'}
                        </Typography>
                        {/* Bio */}
                        <Typography variant="body1">I'm a the best developer!</Typography>
                        {/* Metrics */}
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{state?.followingUser?.followerCount || 0}</Typography>
                                <Typography variant="body1" color="textSecondary">Followers</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{state?.followingUser?.followingCount || 0}</Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid2>
                {/* UnFollow button */}
                <Grid2 size={2}>
                    {state?.followingUser?.username !== currentUser?.username && (
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
                open={state?.openUnFollowConfirmDialog || false}
                onClose={() => setState({ ...state, openUnFollowConfirmDialog: false })}
                username={state?.followingUser?.username}
                fullName={state?.followingUser?.fullName}
                profilePic={state?.followingUser?.profilePic}
                onConfirm={(success) => {
                    if (success) {
                        setState({
                            ...state,
                            isFollowing: false,
                            openUnFollowConfirmDialog: false,
                            followingUser: {
                                ...state.followingUser,
                                followerCount: state.followingUser?.followerCount - 1
                            }
                        });
                    }
                }}
            />
        </>
    );
}
