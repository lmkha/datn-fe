'use client';

import { Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import HashtagComponent from "./hashtag-component";
import DescriptionComponent from "./description-component";
import ActionButton from "./action-button";
import AuthorInfoComponent from "./author-info";
import VideoPlayerComponent from "./video-player";

interface VideoSectionProps {
    changeTheaterMode: () => void;
}
export default function VideoSection(props: VideoSectionProps) {
    const [liked, setLiked] = useState(false);

    return (
        <Stack sx={{
            width: '100%',
        }}>
            {/* Video component */}
            <VideoPlayerComponent changeTheaterMode={props.changeTheaterMode} />

            <Stack sx={{
                borderLeft: '1px solid lightgray',
                borderRight: '1px solid lightgray',
                // paddingBottom: 1,
            }}>
                {/* Title, author info, heart, comment, share */}
                <Grid2 container alignItems={'center'} sx={{ width: '100%' }}>
                    {/* Title, author info */}
                    <Grid2 size={10} justifyContent={'center'} alignItems={'center'} pt={1}>
                        <Stack>
                            <Typography variant="h6" fontWeight={'bold'}>
                                M10 Humiliates Cr7 And Real Madrid In The 2011 Champions Semifinal
                            </Typography>
                            <AuthorInfoComponent
                                username="lmkha"
                                fullName="Lê Minh Kha"
                                subscribers="1.2M"
                            />
                        </Stack>
                    </Grid2>
                    {/* Heart, comment, share */}
                    <Grid2 size={2}>
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'} sx={{
                            padding: 1,
                            borderRadius: '10px',
                            border: '1px solid lightgray',
                        }}>
                            <ActionButton liked={liked} setLiked={setLiked} />
                        </Stack>
                    </Grid2>
                </Grid2>

                {/* Views, date posted, hashtag */}
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
            </Stack>
        </Stack >
    );
}
