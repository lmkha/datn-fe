'use client';

import { IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { formatNumberToShortText } from "@/core/logic/convert";
import { useEffect, useState } from "react";
import { isLikedVideo, likeVideo, unlikeVideo } from "@/services/real/video";
import { get } from "@/hooks/use-local-storage";
import RequestLoginDialog from "@/core/components/require-login-dialog";

interface State {
    liked?: boolean;
    likeCount?: number;
    commentCount?: number;
    isLoading?: boolean;
    openLoginRequestDialog?: boolean;
    loginRequestDialogMessage?: string;
}
interface ActionButtonProps {
    videoId: string;
    likeCount: number;
    commentCount: number;
    onComment?: () => void;
}

export default function ActionButton(props: ActionButtonProps) {
    const isLogged = get<string>("accessToken") ? true : false;
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
        if (!isLogged) {
            setState({
                ...state,
                openLoginRequestDialog: true,
                loginRequestDialogMessage: "You need to login to like this video."
            });
            return;
        }
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
        if (!isLogged) {
            setState({
                ...state,
                openLoginRequestDialog: true,
                loginRequestDialogMessage: "You need to login to comment this video."
            });
            return;
        }
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

            {/* Request login dialog */}
            <RequestLoginDialog
                open={state?.openLoginRequestDialog || false}
                onClose={() => setState({ ...state, openLoginRequestDialog: false })}
                title="Login Required"
                description={state?.loginRequestDialogMessage || "You need to login to perform this action."}
                submitText="Login"
                cancelText="Cancel"
            />
        </>
    );
}
