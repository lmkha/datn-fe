'use client';

import { Grid2, Stack, Typography } from "@mui/material";
import HashtagComponent from "./hashtag-component";
import ActionButton from "./action-button";
import AuthorInfoComponent from "./author-info";
import VideoPlayerComponent from "./video-player";
import { getVideoStreamLink } from "@/services/real/video";
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/format";

interface VideoSectionProps {
    video: any,
    author: any,
    changeTheaterMode: () => void;
    onComment?: () => void;
}
export default function VideoSection(props: VideoSectionProps) {
    return (
        <Stack sx={{
            width: '100%',
            padding: 2,
        }}>
            {/* Video component */}
            <VideoPlayerComponent
                videoLink={getVideoStreamLink(props?.video?.id)}
                thumbnail={props?.video?.thumbnailUrl}
                changeTheaterMode={props.changeTheaterMode}
            />

            <Stack>
                {/* Title, author info, heart, comment, share */}
                <Grid2 container alignItems={'center'} sx={{ width: '100%' }}>
                    {/* Title, author info */}
                    <Grid2 size={10} justifyContent={'center'} alignItems={'center'} pt={1}>
                        <Stack>
                            <Typography variant="h6" fontWeight={'bold'}>
                                {props?.video?.title || 'Title'}
                            </Typography>
                            <AuthorInfoComponent
                                user={props.author}
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
                                videoId={props?.video?.id}
                                likeCount={props?.video?.likesCount}
                                commentCount={props?.video?.commentsCount}
                                onComment={() => props.onComment && props.onComment()}
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
