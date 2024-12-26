'use client';

import { Box, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from 'next/navigation';
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/format";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { CldImage } from "next-cloudinary";
import UserAvatar from "@/core/components/avatar";

interface VideoItemProps {
    video: any;
}
export default function VideoItem(props: VideoItemProps) {
    const router = useRouter();
    return (
        <Box
            key={props?.video?.id}
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                minHeight: 250,
            }}
        >
            <Grid2 container spacing={2} sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail */}
                <Grid2 size={4} sx={{
                    height: '100%',
                }}>
                    {/* Thumbnail & Overlay */}
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover .video-title': {
                                opacity: 1,
                                visibility: 'visible',
                            },
                        }}
                    >
                        {props?.video?.thumbnailUrl ? (
                            <CldImage
                                fill={true}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                                src={props.video.thumbnailUrl}
                                alt="Image"
                            />
                        ) : (
                            <Image
                                src="/images/video-image.png"
                                alt="Image"
                                layout="fill"
                                objectFit="revert"
                            />
                        )}

                        {/* Video overlay */}
                        <Box
                            onClick={() => {
                                props.video?.user?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.video.user.username}/videos/${props.video.id}`);
                            }}
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
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Stack padding={2}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {props?.video?.title}
                                </Typography>

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
                                        <Typography>Everyone</Typography>
                                        <Typography>Nov 17, 2024</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Grid2>

                {/* Video Info */}
                <Grid2 size={8} height={'100%'} padding={1}>
                    <Stack
                        spacing={1}>
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                            onClick={() => {
                                props.video?.user?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.video.user.username}/videos/${props.video.id}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {props?.video?.title}
                        </Typography>
                        <Stack direction={'row'} width={'100%'} spacing={2}>
                            <Typography variant="body2">{formatNumberToShortText(props?.video?.viewsCount)} views</Typography>
                            <Typography variant="body2">{formatTimeToShortText(props?.video?.createdAt)}</Typography>
                        </Stack>
                        {/* Account info */}
                        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
                            <UserAvatar
                                src={props?.video?.user?.profilePic}
                                size={50}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    props.video?.user?.username && router.push(`/@${props.video.user.username}`);
                                    e.stopPropagation();
                                }}
                            />
                            <Typography variant="body1" fontWeight={'bold'}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    props.video?.user?.username && router.push(`/@${props.video.user.username}`);
                                    e.stopPropagation();
                                }}
                            >
                                @{props?.video?.user?.username}
                            </Typography>
                        </Stack>
                        <Typography variant="body2">{props?.video?.description}</Typography>
                    </Stack>

                </Grid2>
            </Grid2>
        </Box>
    );
}