'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from "react";
import { followUser, getPublicUserByUsername, isFollowing, unFollowUser } from "@/services/real/user";
import { getVideosByUserId } from "@/services/real/video";
import { CldImage } from 'next-cloudinary';
import MyTabs, { Tab } from "../../components/tabs";
import Filter from "../../components/filter";
import VideoItem from "../components/video-item";
import PlaylistItem from "../components/playlist-item";
import LikedVideo from "../components/liked-video-item";
import { get } from "@/hooks/use-local-storage";
import UserAvatar from "@/core/components/avatar";
import { getAllPlaylistByUserId } from "@/services/real/playlist";

interface State {
    user?: any;
    videos?: any[];
    username?: string;
    playlists?: any[];
    selectedTab?: Tab;
    isFollowing?: boolean;
}
interface OtherProfileProps {
    username: string;
}
export default function OtherProfile({ username }: OtherProfileProps) {
    const [state, setState] = useState<State>({
        selectedTab: 'videos',
    });

    const fetchData = async () => {
        if (username) {
            getPublicUserByUsername({ username: username }).then((result) => {
                if (result.success && result.user) {
                    setState((prevState) => ({
                        ...prevState,
                        user: result.user,
                    }));
                    getVideosByUserId(result.user.id).then((videosResult) => {
                        setState((prevState) => ({
                            ...prevState,
                            user: result.user,
                            videos: videosResult.data,
                        }));
                    });
                    getAllPlaylistByUserId(result.user.id).then((playlistsResult) => {
                        setState((prevState) => ({
                            ...prevState,
                            playlists: playlistsResult.data,
                        }));
                    });
                }
            });
            isFollowing({ username: username }).then((result) => {
                setState((prevState) => ({
                    ...prevState,
                    isFollowing: result.success ? result.isFollowing : false,
                }));
            });
        }
    };

    const handleFollow = async () => {
        const fetchUserDataRelateToFollow = async () => {
            username && getPublicUserByUsername({ username: username }).then((result) => {
                if (result.success && result.user) {
                    setState((prevState) => ({
                        ...prevState,
                        user: result.user,
                    }));
                }
            });
        };

        if (state?.isFollowing) {
            unFollowUser({ username: username }).then((result) => {
                if (result.success) {
                    setState((prevState) => ({
                        ...prevState,
                        isFollowing: false,
                    }));
                    fetchUserDataRelateToFollow();
                }
            });
        } else {
            followUser({ username: username }).then((result) => {
                if (result.success) {
                    setState((prevState) => ({
                        ...prevState,
                        isFollowing: true,
                    }));
                    fetchUserDataRelateToFollow();
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        (<Stack direction={'column'} spacing={2}>
            {/* Section 1: Userinfo */}
            <Grid2 container direction={'row'} spacing={20}>
                {/* Avatar */}
                <Grid2 size={2}>
                    <UserAvatar src={state?.user?.profilePic} size={200} />
                </Grid2>

                {/* Username, button, following, followers */}
                <Grid2 size={10} direction={'column'} sx={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 1,
                    }}>
                        {/* Username, profile name */}
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography sx={{
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                            }}>{username}</Typography>
                            <Typography>{state?.user?.fullName || 'No name'}</Typography>
                        </Stack>

                        {/* Buttons */}
                        <Stack direction={'row'} spacing={2}>
                            <Button
                                onClick={handleFollow}
                                variant={'contained'}
                                sx={{
                                    backgroundColor: state?.isFollowing ? 'lightgrey' : '#EA284E',
                                    color: state?.isFollowing ? 'black' : 'white',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                {state?.isFollowing ? 'UnFollow' : 'Follow'}
                            </Button>
                        </Stack>

                        {/* Following, followers, likes */}
                        <Stack direction={'row'} spacing={4}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state?.user?.followingCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Following</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state?.user?.followerCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Followers</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state?.user?.likes || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Likes</Typography>
                            </Stack>
                        </Stack>

                        {/* Bio */}
                        <Typography>{state?.user?.bio || 'No bio yet'}</Typography>
                    </Box>
                </Grid2>
            </Grid2>
            {/* Section 2: Tabs, filter */}
            <Grid2 container direction={'row'} sx={{
                borderBottom: '1px solid lightgray',
            }}>
                <Grid2 size={6}>
                    <MyTabs
                        onTabChange={(tab: Tab) => setState((prevState) => ({ ...prevState, selectedTab: tab }))}
                    />
                </Grid2>
                <Grid2 size={6} sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'start',
                }}>
                    <Filter />
                </Grid2>
            </Grid2>
            {/* Section 3: Videos or playlists */}
            <Box >
                <Grid2 container spacing={2}>
                    {
                        state?.selectedTab === 'videos' ?
                            (state?.videos && state?.videos.map((video, index) =>
                                <VideoItem
                                    videoId={video.id}
                                    username={state.user?.username || ''}
                                    key={index}
                                    index={index}
                                    title={video.title}
                                    description={video.description}
                                    thumbnail={video.thumbnailUrl}

                                />)
                            ) : state.selectedTab === 'playlists' ? (
                                state?.playlists && state.playlists.map((playlist, index) =>
                                    <PlaylistItem
                                        key={playlist.id}
                                        playlist={playlist}
                                        username={username}
                                    />)
                            ) : (
                                // Liked videos
                                ([...Array(10)].map((_, index) => <LikedVideo key={index} index={index} />))
                            )
                    }
                </Grid2>
            </Box>
        </Stack>)
    );
}
