'use client';

import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { useState } from "react";
import { Comment } from "../../types";

interface CommentProps {
    comment?: Comment;
    onLike?: () => void;
    onDislike?: () => void;
}
export default function CommentComponent(props: CommentProps) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
        <Stack direction={'row'} sx={{
            width: '100%',
            minHeight: '50px',
            borderTop: '1px solid lightgray',
            borderLeft: '1px solid lightgray',
            borderRight: '1px solid lightgray',
            cursor: 'pointer',
        }}
            onClick={() => setExpanded(!expanded)}
            onDoubleClick={() => {

            }}
        >
            <Box padding={1}>
                <Avatar
                    src="/images/avatar.jpg"
                    alt="avatar"
                    sx={{
                        width: 50,
                        height: 50,
                    }}
                />
            </Box>
            <Stack sx={{ overflowY: 'auto' }}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        {props?.comment?.username}
                    </Typography>
                    <Typography variant="body2">
                        {props?.comment?.createdAt}
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'revert',
                        WebkitLineClamp: expanded ? 'none' : 2,
                    }}
                >{props?.comment?.content}</Typography>
                <Stack direction={'row'} spacing={1}>
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        setLiked(!liked);
                        props.onLike && props.onLike();
                        if (disliked) {
                            setDisliked(false);
                        }
                    }}>
                        {liked ? <ThumbUpRoundedIcon sx={{ color: '#EA284E' }} /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        setDisliked(!disliked);
                        props.onDislike && props.onDislike();
                        if (liked) {
                            setLiked(false);
                        }
                    }}>
                        {disliked ? <ThumbDownRoundedIcon sx={{ color: 'black' }} /> : <ThumbDownOutlinedIcon />}
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
}