'use client';

import * as React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid2, Stack, Typography, IconButton } from "@mui/material";
import { useRouter } from 'next/navigation';
import { formatNumberToShortText, formatTimeToShortText } from "@/core/logic/convert";
import { getVideoByVideoId } from '@/services/real/video';
import VideoThumbnail from '@/core/components/video-thumbnail';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
};
interface VideosModalProps {
    open: boolean;
    onClose: () => void;
    playlistId?: string;
    playlistName?: string;
    videoIds?: string[] | null;
    username?: string;
}

interface State {
    videos?: any[];
    isLoading?: boolean;
}

export default function VideosModal(props: VideosModalProps) {
    const [state, setState] = React.useState<State>();

    const fetchData = async () => {
        console.log('props?.videoIds:', props?.videoIds);

        if (!props?.videoIds || props?.videoIds?.length === 0) {
            return;
        }

        try {
            const promises = props.videoIds.map((videoId) => getVideoByVideoId(videoId));
            const responses = await Promise.all(promises);

            const videos = responses
                .filter((response) => response.success && response.data)
                .map((response) => response.data);

            setState((state) => ({
                ...state,
                videos: [...(state?.videos || []), ...videos],
            }));
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    React.useEffect(() => {
        if (props?.open && !state?.videos) {
            fetchData();
        }
    }, [props.open]);

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        {props?.playlistName}
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Scrollable Content */}
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                }}>
                    <Stack spacing={2}>
                        {state?.videos?.map((video) => (
                            <VideoItem key={video.id} video={video} username={props.username} />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
}

interface VideoItemProps {
    video: any;
    username?: string;
}
function VideoItem(props: VideoItemProps) {
    const router = useRouter();

    React.useEffect(() => {
        console.log('ThumbnailUrl:', props?.video?.thumbnailUrl);
    }, [props?.video]);

    return (
        <Box
            sx={{
                backgroundColor: '#F8F8F8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                height: 150
            }}
        >
            <Grid2 container spacing={2} sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Thumbnail */}
                <Grid2 size={4} sx={{ height: '100%' }}>
                    {/* Thumbnail */}
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
                        <VideoThumbnail
                            thumbnailUrl={props?.video?.thumbnailUrl}
                            onClick={() => {
                                props?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.username}/videos/${props.video.id}`);
                            }}
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
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
                                props?.username &&
                                    props?.video?.id &&
                                    router.push(`/@${props.username}/videos/${props.video.id}`);
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
                        <Typography variant="body2">{props?.video?.description}</Typography>
                    </Stack>

                </Grid2>
            </Grid2>
        </Box >
    );
}
