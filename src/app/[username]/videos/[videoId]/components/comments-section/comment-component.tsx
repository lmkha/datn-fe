
'use client';

import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { useState } from "react";

export default function CommentComponent() {
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

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
                        lmkha
                    </Typography>
                    <Typography variant="body2">
                        1 year ago
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
                >
                    xem lại thực sự quá cảm xúc đây chính xác là trận chung kết hay nhất lịch sử wc từ 90 giây của Mbappe, từ màn rượt đuổi tỉ số của cả hai đội, đặc biệt trận đấu này giúp Messi có được danh hiệu còn sót lại cuối cùng của anh và cũng giúp anh khẳng định được vị thế vĩ đại số 1 trong ngôi đền huyền thoại lịch sử bóng đá.
                    chúc mừng anh lần nữa Leo Messi
                </Typography>
                <Stack direction={'row'} spacing={1}>
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        setLiked(!liked);
                        if (disliked) {
                            setDisliked(false);
                        }
                    }}>
                        {liked ? <ThumbUpRoundedIcon sx={{ color: '#EA284E' }} /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        setDisliked(!disliked);
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