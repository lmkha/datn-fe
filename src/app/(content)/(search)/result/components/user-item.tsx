'use client';

import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatNumberToShortText } from "@/core/logic/format";
import { followUser, isFollowing } from "@/services/real/user";
import UnFollowConfirmDialog from "@/app/(content)/components/unfollow-dialog";
import { get } from "@/hooks/use-local-storage";
import UserAvatar from "@/core/components/avatar";

interface State {
    openUnFollowConfirmDialog?: boolean;
    isFollowing?: boolean;
    followingCount?: number;
    followersCount?: number;
}
interface UserItemProps {
    user: any;
}
export default function UserItem(props: UserItemProps) {
    const currentUser = get<any>('user');
    const router = useRouter();
    const [state, setState] = useState<State>({ openUnFollowConfirmDialog: false });

    const fetchData = async () => {
        if (!props.user?.username) return;
        const result = await isFollowing({ username: props.user.username });
        const resultState = { ...state };
        resultState.followersCount = parseInt(props?.user?.followerCount) || 0;
        resultState.followingCount = parseInt(props?.user?.followingCount) || 0;
        if (result.success) {
            resultState.isFollowing = result.isFollowing;
        } else {
            resultState.isFollowing = false;
        }
        setState(resultState);
    };

    const handleFollow = async () => {
        if (!props.user?.username) return;
        if (state.isFollowing) {
            setState({ ...state, openUnFollowConfirmDialog: true });
            return;
        }
        const result = await followUser({ username: props.user.username });
        if (result.success) {
            setState({
                ...state,
                isFollowing: true,
                followersCount: state?.followersCount ? state.followersCount + 1 : 1
            });
        } else {
            setState({ ...state, isFollowing: false });
        }
    };

    useEffect(() => {
        setState({
            ...state,
            followingCount: parseInt(props?.user?.followingCount) || 0,
            followersCount: parseInt(props?.user?.followerCount) || 0,
        });
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
                    <UserAvatar
                        src={props?.user?.profilePic}
                        size={100}
                        onClick={(e) => {
                            props?.user?.username && router.push(`/@${props.user.username}`);
                            e.stopPropagation();
                        }}
                        sx={{
                            cursor: 'pointer',
                        }}
                    />
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
                                <Typography variant="body1">{formatNumberToShortText(state?.followersCount || 0)} </Typography>
                                <Typography variant="body1" color="textSecondary">Followers</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1">{formatNumberToShortText(state?.followingCount || 0)} </Typography>
                                <Typography variant="body1" color="textSecondary">Following</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid2>
                {/* UnFollow button */}
                <Grid2 size={2}>
                    {props?.user?.username !== currentUser?.username && (
                        <Button sx={{
                            width: '100%',
                            height: '50px',
                            backgroundColor: state?.isFollowing ? 'lightgray' : '#EA284E',
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
                username={props?.user?.username}
                fullName={props?.user?.fullName}
                profilePic={props?.user?.profilePic}
                onConfirm={(success) => {
                    if (success) {
                        setState({
                            ...state,
                            isFollowing: false,
                            openUnFollowConfirmDialog: false,
                            followersCount: state?.followersCount ? state.followersCount - 1 : 0
                        });
                    }
                }}
            />
        </>
    );
}