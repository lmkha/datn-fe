'use client';

import { Avatar, Box, Grid2, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useState } from "react";
import HashtagComponent from "./hashtag-component";
import DescriptionComponent from "./description-component";

// Contain authorAvatar, userName, fullName, video, title, description, tags, views, likes, dislikes, comments

export default function VideoSection() {
    const [liked, setLiked] = useState(false);

    return (
        <Stack sx={{
            width: '100%',
            borderRadius: '10px',
            border: '1px solid lightgray',
            marginBottom: 2
        }}>
            <Box sx={{
                backgroundColor: 'black',
                width: '100%',
                height: '530px',
                borderRadius: '10px',
            }}>
                Video player
            </Box>

            <Stack>
                <Grid2 container alignItems={'center'} sx={{ width: '100%' }}>
                    {/* Title, author info */}
                    <Grid2 size={10} justifyContent={'center'} alignItems={'center'} pt={1}>
                        <Stack>
                            <Typography variant="h6" fontWeight={'bold'}>
                                M10 Humiliates Cr7 And Real Madrid In The 2011 Champions Semifinal
                            </Typography>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <Avatar
                                    src="/images/avatar.jpg"
                                    alt="avatar"
                                    sx={{
                                        width: 50,
                                        height: 50,
                                    }}
                                />
                                <Stack>
                                    <Typography variant="body1" fontWeight={'bold'}>lmkha</Typography>
                                    <Typography variant="body2">Lê Minh Kha</Typography>
                                    <Typography variant="body2" color='textSecondary'>1.5M subscribers</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                    {/* Heart, comment, share */}
                    <Grid2 size={2}>
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'} sx={{
                            padding: 1,
                            borderRadius: '10px',
                            border: '1px solid lightgray',
                        }}>
                            {/* Like button */}
                            <Stack justifyContent={'center'} alignItems={'center'}>
                                <IconButton onClick={() => setLiked(!liked)}>
                                    {liked ?
                                        <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> :
                                        <FavoriteBorderOutlinedIcon sx={{
                                            ":hover": {
                                                color: 'black'
                                            }
                                        }} />
                                    }
                                </IconButton>
                                <Typography variant="body2">2.7M</Typography>
                            </Stack>

                            {/* Comment button */}
                            <Stack justifyContent={'center'} alignItems={'center'}>
                                <IconButton>
                                    <ChatBubbleOutlineOutlinedIcon sx={{
                                        ":hover": {
                                            color: 'black'
                                        }
                                    }} />
                                </IconButton>
                                <Typography variant="body2">2K</Typography>
                            </Stack>

                            {/* Share button */}
                            <Stack justifyContent={'center'} alignItems={'center'}>
                                <IconButton>
                                    <ShortcutIcon sx={{
                                        ":hover": {
                                            color: 'black'
                                        }
                                    }} />
                                </IconButton>
                                <Typography variant="body2">270</Typography>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>

                {/* Views, date posted, tag */}
                <Stack direction={'row'} spacing={2} display={'flex'} alignItems={'center'}>
                    <Typography variant="body2" fontWeight={'bold'}>2.7M views</Typography>
                    <Typography variant="body2" fontWeight={'bold'}>1 year ago</Typography>
                    {/* HashTag */}
                    <Stack direction={'row'} spacing={1}>
                        <HashtagComponent text={'#football'} />
                        <HashtagComponent text={'#cr7'} />
                        <HashtagComponent text={'#m10'} />
                        <HashtagComponent text={'#champions league'} />
                    </Stack>
                </Stack>
                {/* Description */}
                <DescriptionComponent />
            </Stack>
        </Stack >
    );
}