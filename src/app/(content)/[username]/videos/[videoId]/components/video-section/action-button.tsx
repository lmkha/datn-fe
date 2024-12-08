'use client';

import { IconButton, Stack, Typography } from "@mui/material";
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
}
interface ActionButtonProps {
    videoId: string;
    likeCount: number;
    commentCount: number;
}
export default function ActionButton(props: ActionButtonProps) {
    const [state, setState] = useState<State>({
        liked: false,
        likeCount: props.likeCount,
        commentCount: props.commentCount
    });

    const checkLiked = async () => {
        props?.videoId && isLikedVideo(props.videoId).then((response) => {
            if (response.success) {
                setState({ ...state, liked: response.liked });
            } else {
                setState({ ...state, liked: false });
            }
        });
    };

    const handleLike = async () => {
        if (!props.videoId) return;

        if (state?.liked == true) {
            unlikeVideo(props.videoId).then((response) => {
                if (response.success) {
                    setState({
                        ...state,
                        liked: false,
                        likeCount: state?.likeCount ? state.likeCount - 1 : 0
                    });
                }
            });
        } else {
            // Like video
            likeVideo(props.videoId).then((response) => {
                if (response.success) {
                    setState({
                        ...state,
                        liked: true,
                        likeCount: state?.likeCount ? state.likeCount + 1 : 1
                    });
                }
            });
        }
    };

    const handleComment = async () => {

    };

    const fetchData = async () => {
        checkLiked();
    };

    useEffect(() => {
        fetchData();
    }, []);

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

                <Typography variant="body2">{formatNumberToShortText(state?.likeCount || 0)}</Typography>
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
