'use client';

import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { formatNumberToShortText } from "@/core/logic/convert";

interface ActionButtonProps {
    likeCount: number;
    commentCount: number;
    liked: boolean;
    setLiked: (liked: boolean) => void;
}
export default function ActionButton(props: ActionButtonProps) {
    return (
        <>
            {/* Like button */}
            <Stack justifyContent={'center'} alignItems={'center'}>
                <IconButton onClick={() => props.setLiked(!props.liked)}>
                    {props.liked ?
                        <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> :
                        <FavoriteBorderOutlinedIcon sx={{
                            ":hover": {
                                color: 'black'
                            }
                        }} />
                    }
                </IconButton>

                <Typography variant="body2">{formatNumberToShortText(props.likeCount)}</Typography>
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
                <Typography variant="body2">{formatNumberToShortText(props.commentCount)}</Typography>
            </Stack>
        </>
    );
}
