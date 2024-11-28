'use client';

import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import { IoIosShareAlt } from "react-icons/io";
import MyTabs, { Tab } from "../components/tabs";
import Filter from "../components/filter";
import { useState } from "react";
import { useContentContext } from "@/contexts/content-context";

export default function Profile() {
    const { dispatch } = useContentContext();
    const params = useParams();
    const { username } = params;
    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
    const [selectedTab, setSelectedTab] = useState<Tab>();

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
                            <Typography>Le Minh Kha</Typography>
                        </Stack>

                        {/* Buttons */}
                        <Stack direction={'row'} spacing={2}>
                            <Button variant={'contained'} sx={{
                                backgroundColor: '#EA284E',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}>Edit Profile</Button>
                            <Button variant="contained" sx={{
                                minWidth: 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 'large',
                                color: 'black',
                                backgroundColor: 'lightgrey',
                            }}><SettingsIcon /></Button>

                            <Button variant="contained" sx={{
                                minWidth: 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 'large',
                                color: 'black',
                                backgroundColor: 'lightgrey',
                            }}><IoIosShareAlt /></Button>
                        </Stack>

                        {/* Following, followers, likes */}
                        <Stack direction={'row'} spacing={4}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>27</Typography>
                                <Typography sx={{ color: 'gray' }}>Following</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>120K</Typography>
                                <Typography sx={{ color: 'gray' }}>Followers</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>2M</Typography>
                                <Typography sx={{ color: 'gray' }}>Likes</Typography>
                            </Stack>
                        </Stack>

                        {/* Bio */}
                        <Typography>I'm a the best developer!</Typography>
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
                <Grid2 container spacing={4}>
                    {
                        selectedTab === 'videos' ? (
                            [...Array(10)].map((_, index) => (
                                <Grid2
                                    key={index}
                                    minHeight={170}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        lg: 4,
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
                                        Video {index + 1}
                                    </Typography>
                                </Grid2>
                            ))
                        ) : selectedTab === 'playlists' ? (
                            [...Array(5)].map((_, index) => (
                                <Grid2
                                    key={index}
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
                                        Playlist {index + 1}
                                    </Typography>
                                </Grid2>
                            ))
                        ) : (
                            // Liked videos
                            ([...Array(10)].map((_, index) => (
                                <Grid2
                                    key={index}
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
                                        Liked video {index + 1}
                                    </Typography>
                                </Grid2>
                            )))
                        )
                    }
                </Grid2>
            </Box>
        </Stack>)
    );
}
