'use client';

import { IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { formatNumberToShortText } from "@/core/logic/convert";
import { useEffect, useState } from "react";
import { isLikedVideo, likeVideo, unlikeVideo } from "@/services/real/video";

interface State {
    liked?: boolean;
    likeCount?: number;
    commentCount?: number;
    isLoading?: boolean;
}
interface ActionButtonProps {
    videoId: string;
    likeCount: number;
    commentCount: number;
    onComment?: () => void;
}

export default function ActionButton(props: ActionButtonProps) {
    const [state, setState] = useState<State>({
        liked: false,
        likeCount: props.likeCount,
        commentCount: props.commentCount,
        isLoading: true
    });

    const checkLiked = async () => {
        if (props?.videoId) {
            const response = await isLikedVideo(props.videoId);
            if (response.success) {
                setState((prevState) => ({ ...prevState, liked: response.liked }));
            } else {
                setState((prevState) => ({ ...prevState, liked: false }));
            }
        }
    };

    const handleLike = async () => {
        if (!props.videoId) return;

        if (state?.liked) {
            const response = await unlikeVideo(props.videoId);
            if (response.success) {
                setState((prevState) => ({
                    ...prevState,
                    liked: false,
                    likeCount: prevState.likeCount ? prevState.likeCount - 1 : 0
                }));
            }
        } else {
            const response = await likeVideo(props.videoId);
            if (response.success) {
                setState((prevState) => ({
                    ...prevState,
                    liked: true,
                    likeCount: prevState.likeCount ? prevState.likeCount + 1 : 1
                }));
            }
        }
    };

    const handleComment = async () => {
        // Add your comment handling logic here
        if (props.onComment) {
            props.onComment();
        }
    };

    const fetchData = async () => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        await checkLiked();
        setState((prevState) => ({
            ...prevState,
            likeCount: props.likeCount,
            commentCount: props.commentCount,
            isLoading: false
        }));
    };

    useEffect(() => {
        fetchData();
    }, [props.likeCount, props.commentCount, props.videoId]);

    if (state.isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            {/* Like button */}
            <Stack justifyContent={'center'} alignItems={'center'}>
                <IconButton onClick={handleLike}>
                    {state?.liked ?
                        <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> :
                        <FavoriteBorderOutlinedIcon sx={{
                            ":hover": {
                                color: 'black'
                            }
                        }} />
                    }
                </IconButton>
                <Typography variant="body2">{formatNumberToShortText(state.likeCount || 0)}</Typography>
            </Stack>

            {/* Comment button */}
            <Stack justifyContent={'center'} alignItems={'center'}>
                <IconButton onClick={handleComment}>
                    <ChatBubbleOutlineOutlinedIcon sx={{
                        ":hover": {
                            color: 'black'
                        }
                    }} />
                </IconButton>
                <Typography variant="body2">{formatNumberToShortText(state?.commentCount || 0)}</Typography>
            </Stack>
        </>
    );
}
