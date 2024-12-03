'use client';

import { Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import HashtagComponent from "./hashtag-component";
import ActionButton from "./action-button";
import AuthorInfoComponent from "./author-info";
import VideoPlayerComponent from "./video-player";
import { getVideoStreamLink } from "@/services/real/video";
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/convert";

interface VideoSectionProps {
    video: any,
    user: any,
    changeTheaterMode: () => void;
}
export default function VideoSection(props: VideoSectionProps) {
    const [liked, setLiked] = useState(false);

    return (
        <Stack sx={{
            width: '100%',
        }}>
            {/* Video component */}
            <VideoPlayerComponent
                videoLink={getVideoStreamLink(props?.video?.id)}
                thumbnail={props?.video?.thumbnailUrl}
                changeTheaterMode={props.changeTheaterMode}
            />

            <Stack sx={{
                borderLeft: '1px solid lightgray',
                borderRight: '1px solid lightgray',
            }}>
                {/* Title, author info, heart, comment, share */}
                <Grid2 container alignItems={'center'} sx={{ width: '100%' }}>
                    {/* Title, author info */}
                    <Grid2 size={10} justifyContent={'center'} alignItems={'center'} pt={1}>
                        <Stack>
                            <Typography variant="h6" fontWeight={'bold'}>
                                {props?.video?.title || 'Title'}
                            </Typography>
                            <AuthorInfoComponent
                                user={props.user}
                            />
                        </Stack>
                    </Grid2>
                    {/* Heart, comment, share */}
                    <Grid2 size={2}>
                        <Stack direction={'row'} spacing={2} justifyContent={'space-evenly'} alignItems={'center'} sx={{
                            padding: 1,
                            borderRadius: '10px',
                            border: '1px solid lightgray',
                        }}>
                            <ActionButton
                                liked={liked}
                                setLiked={setLiked}
                                likeCount={props?.video?.likesCount || 0}
                                commentCount={props?.video?.commentsCount || 0}
                            />
                        </Stack>
                    </Grid2>
                </Grid2>

                {/* Views, date posted, hashtag */}
                <Stack direction={'row'} spacing={2} display={'flex'} alignItems={'center'}>
                    <Typography variant="body2" fontWeight={'bold'}>{formatNumberToShortText(props.video?.viewsCount)} views</Typography>
                    <Typography variant="body2" fontWeight={'bold'}>{formatTimeToShortText(props.video?.createdAt)}</Typography>

                    {/* HashTag */}
                    <Stack direction={'row'} spacing={1}>
                        {props.video?.tags?.map((tag: string, index: number) => (
                            <HashtagComponent key={index} text={tag} />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    );
}
