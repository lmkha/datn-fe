'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import MyTabs, { Tab } from "../components/tabs";
import Filter from "../components/filter";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/user-context";
import Image from "next/legacy/image";
import { getUserByUsername } from "@/services/real/user";
import { getVideosByUserId } from "@/services/real/video";

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const params = useParams();
    const { username } = params;
    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
    const [selectedTab, setSelectedTab] = useState<Tab>('videos');

    useEffect(() => {
        getUserByUsername({ username: actualUsername }).then((result) => {
            if (result.success) {
                setUser(result.user);
                getVideosByUserId(result.user.id).then((videosResult) => {
                    setVideos(videosResult.data);
                });
            }
        });
    }, []);


    return (
        (<Stack direction={'column'} spacing={2}>
            {/* Section 1: Userinfo */}
            <Grid2 container direction={'row'} spacing={20}>
                {/* Avatar */}
                <Grid2 size={2}>
                    <Avatar
                        src="/images/avatar.jpg"
                        alt="avatar"
                        sx={{
                            width: 200,
                            height: 200,
                        }}
                    />
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
                            }}>{actualUsername}</Typography>
                            {/* <Typography>{userState.fullName || 'No name'}</Typography> */}
                            <Typography>{user?.fullName || 'No name'}</Typography>
                        </Stack>

                        {/* Buttons */}
                        <Stack direction={'row'} spacing={2}>
                            <Button variant={'contained'} sx={{
                                backgroundColor: '#EA284E',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}>
                                {/* {actualUsername === userState.username ? 'Edit Profile' : 'Follow'} */}
                                {actualUsername === user?.username ? 'Edit Profile' : 'Follow'}
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
                                {/* <Typography sx={{ fontWeight: 'bold' }}>27</Typography> */}
                                <Typography sx={{ fontWeight: 'bold' }}>{user?.followingCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Following</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                {/* <Typography sx={{ fontWeight: 'bold' }}>120K</Typography> */}
                                <Typography sx={{ fontWeight: 'bold' }}>{user?.followerCount || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Followers</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                {/* <Typography sx={{ fontWeight: 'bold' }}>2M</Typography> */}
                                <Typography sx={{ fontWeight: 'bold' }}>{user?.likes || 0}</Typography>
                                <Typography sx={{ color: 'gray' }}>Likes</Typography>
                            </Stack>
                        </Stack>

                        {/* Bio */}
                        {/* <Typography>I'm a the best developer!</Typography> */}
                        <Typography>{user?.bio || 'No bio yet'}</Typography>
                    </Box>
                </Grid2>
            </Grid2>
            {/* Section 2: Tabs, filter */}
            <Grid2 container direction={'row'} sx={{
                borderBottom: '1px solid lightgray',
            }}>
                <Grid2 size={6}>
                    <MyTabs
                        onTabChange={(tab: Tab) => setSelectedTab(tab)}
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
                        selectedTab === 'videos' ? (
                            // [...Array(10)].map((_, index) => <VideoItem key={index} index={index} />)
                            videos.map((video, index) =>
                                <VideoItem
                                    videoId={video.id}
                                    username={user?.username || ''}
                                    key={index}
                                    index={index}
                                    title={video.title}
                                    description={video.description}

                                />)
                        ) : selectedTab === 'playlists' ? (
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

interface VideoItemProps {
    videoId: string;
    username: string;
    index: number;
    title: string;
    description: string;
}
function VideoItem(props: VideoItemProps) {
    const router = useRouter();

    return (
        <Grid2
            key={props.index}
            minHeight={250}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
            }}
            sx={{
                position: 'relative',
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover .video-title': {
                    opacity: 1,
                    visibility: 'visible',
                },
            }}
        >
            {/* Content */}
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Image
                    src="/images/video-image.jpg"
                    alt="Image"
                    layout="fill"
                    objectFit="cover"
                />
            </Box>

            {/* Video overlay */}
            <Box
                onClick={() => router.push(`/@${props.username}/videos/${props.videoId}`)}
                className="video-title"
                sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))',
                    display: 'flex',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRadius: '10px',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.3s ease, visibility 0.3s ease',
                    justifyContent: 'start',
                    alignItems: 'end',
                }}
            >
                <Stack padding={2}>
                    {/* <Typography variant="h6">The best attacking trio in football history</Typography> */}
                    <Typography variant="h6">{props.title}</Typography>
                    <Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'}>
                                <PlayArrowOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <FavoriteBorderOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <ChatBubbleOutlineOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <ShortcutIcon />
                                <Typography>125K</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Typography>Every one</Typography>
                            <Typography>Nov 17, 2024</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Grid2>
    );
}

interface PlaylistItemProps {
    index: number;
}
function PlaylistItem(props: PlaylistItemProps) {
    return (
        <Grid2
            key={props.index}
            minHeight={100}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 6,
            }}
            sx={{
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Playlist {props.index + 1}
            </Typography>
        </Grid2>
    );
}

interface LikedVideoProps {
    index: number;
}
function LikedVideo(props: LikedVideoProps) {
    return (
        <Grid2
            key={props.index}
            minHeight={170}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
            }}
            sx={{
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Liked video {props.index + 1}
            </Typography>
        </Grid2>
    );
}