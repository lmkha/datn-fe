'use client';

import Header from "@/core/components/header";
import { Avatar, Box, Button, Divider, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import { IoIosShareAlt } from "react-icons/io";
import MyTabs from "./components/tabs";
import Filter from "./components/filter";

export default function Profile() {
    const params = useParams();
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            {/* <Header /> */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                borderBottom: '1px solid lightgray',
            }}>
                <Header />
            </Box>
            <Grid2 container direction={'row'} sx={{ height: '92%' }}>
                {/* Drawer */}
                <Grid2 size={2} sx={{
                    borderRight: '1px solid lightgray',
                }}>
                    <Stack direction={'column'} sx={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography variant={'h5'}>Manage Account</Typography>
                        <Typography variant={'h5'}>Following</Typography>
                    </Stack>
                </Grid2>

                {/* Content */}
                <Grid2 size={10} padding={1}>
                    <Stack direction={'column'} spacing={2}>
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
                                    <Stack direction={'row'} spacing={2}>
                                        <Typography>{params.username}</Typography>
                                        <Typography>Le Minh Kha</Typography>
                                    </Stack>

                                    {/* Buttons */}
                                    <Stack direction={'row'} spacing={2}>
                                        <Button variant={'contained'} sx={{
                                            backgroundColor: '#EA284E',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}>Edit Profile</Button>
                                        {/* <Button variant={'contained'} sx={{
                                            backgroundColor: 'lightgrey',
                                            textTransform: 'none',
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}>Promote post</Button> */}
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

                                    <Typography>I'm a the best developer!</Typography>
                                </Box>
                            </Grid2>
                        </Grid2>

                        {/* Section 2: Tabs, filter */}
                        <Grid2 container direction={'row'}>
                            <Grid2 size={6}>
                                <MyTabs />
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
                    </Stack>
                </Grid2>
            </Grid2>
        </Box >
    );
}
