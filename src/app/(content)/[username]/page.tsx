'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import MyTabs, { Tab } from "../components/tabs";
import Filter from "../components/filter";
import { useEffect, useState } from "react";
import { getPublicUserByUsername } from "@/services/real/user";
import { getVideosByUserId } from "@/services/real/video";
import { CldImage } from 'next-cloudinary';
import PlaylistItem from "./components/playlist-item";
import LikedVideo from "./components/liked-video-item";
import VideoItem from "./components/video-item";

interface PageState {
    user: any;
    videos: any[];
    username: string;
    actualUsername: string;
    selectedTab: Tab;
}
export default function Profile() {
    const params = useParams();
    const [state, setState] = useState<PageState>({
        user: null,
        videos: [],
        username: '',
        actualUsername: '',
        selectedTab: 'videos',
    });

    useEffect(() => {
        const { username } = params;
        const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
        setState((prevState) => ({
            ...prevState,
            username: username as string,
            actualUsername,
        }));
    }, [params]);

    const fetchData = async () => {
        if (state.actualUsername) {
            getPublicUserByUsername({ username: state.actualUsername }).then((result) => {
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
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [state.actualUsername]);

    return (
        (<Stack direction={'column'} spacing={2}>
            {/* Section 1: Userinfo */}
            <Grid2 container direction={'row'} spacing={20}>
                {/* Avatar */}
                <Grid2 size={2}>
                    {state?.user?.profilePic ?
                        (<Box sx={{
                            width: 200,
                            height: 200,
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
                                src={state?.user.profilePic}
                                alt="Image"
                            />
                        </Box>) :
                        (<Avatar
                            src="/images/avatar.png"
                            alt="avatar"
                            sx={{
                                width: 200,
                                height: 200,
                            }}
                        />)}
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
                            }}>{state.actualUsername}</Typography>
                            <Typography>{state.user?.fullName || 'No name'}</Typography>
                        </Stack>

                        {/* Buttons */}
                        <Stack direction={'row'} spacing={2}>
                            <Button variant={'contained'} sx={{
                                backgroundColor: '#EA284E',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}>
                                {state.actualUsername === state.user?.username ? 'Edit Profile' : 'Follow'}
                            </Button>
                            <Button variant="contained" sx={{
                                minWidth: 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 'large',
                                color: 'black',
                                backgroundColor: 'lightgrey',
                            }}><SettingsIcon /></Button>
                        </Stack>

                        {/* Following, followers, likes */}
                        <Stack direction={'row'} spacing={4}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state.user?.followingCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Following</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state.user?.followerCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Followers</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{state.user?.likes || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Likes</Typography>
                            </Stack>
                        </Stack>

                        {/* Bio */}
                        <Typography>{state.user?.bio || 'No bio yet'}</Typography>
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
                        state.selectedTab === 'videos' ? (
                            state.videos.map((video, index) =>
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
                            [...Array(5)].map((_, index) => <PlaylistItem key={index} index={index} />)
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
