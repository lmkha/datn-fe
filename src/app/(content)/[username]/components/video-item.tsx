'use client';

import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { CldImage } from 'next-cloudinary';
import Image from "next/legacy/image";

interface VideoItemProps {
    videoId: string;
    username: string;
    index: number;
    title: string;
    description: string;
    thumbnail?: string;
}
export default function VideoItem(props: VideoItemProps) {
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
                {props.thumbnail ?
                    (<CldImage
                        fill={true}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                        src={props.thumbnail || ''}
                        alt="Image"

                    />) :
                    (<Image
                        src="/images/video-image.png"
                        alt="Image"
                        layout="fill"
                        objectFit="revert"
                    />)
                }
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
                    <Typography variant="h6" sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2,
                        lineHeight: 1.5,
                    }}>{props.title}</Typography>
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