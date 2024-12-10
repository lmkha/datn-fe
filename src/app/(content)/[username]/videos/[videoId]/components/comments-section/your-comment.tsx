'use client';

import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { get } from "@/hooks/use-local-storage";
import { CldImage } from "next-cloudinary";
import { addComment } from "@/services/real/comment";

interface State {
    expanded?: boolean;
    isFocused?: boolean;
    content?: string;
}

interface CommentProps {
    videoId: string;
    onCommented?: () => void;
}
export default function YourCommentComponent(props: CommentProps) {
    const [state, setState] = useState<State>();
    const currentUser = get('user');

    const handleAddComment = async () => {
        if (state?.content && state?.content.length > 0) {
            addComment({ videoId: props.videoId, content: state.content }).then((result) => {
                if (result.success) {
                    setState({
                        expanded: false,
                        isFocused: false,
                        content: '',
                    });
                    props?.onCommented && props.onCommented();
                }
            });
        }
    };

    return (

        <Stack direction={'row'} spacing={2} sx={{
            width: '100%',
            minHeight: '50px',
            cursor: 'pointer',
            padding: 1,
            borderRadius: '10px',
            border: '3px solid #F8F8F8'

        }}>
            {/* Avatar */}
            {currentUser?.profilePic ?
                (<Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <CldImage
                        fill={true}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                        src={currentUser.profilePic}
                        alt="Image"
                    />
                </Box>) :
                (<Avatar
                    src="/images/avatar.png"
                    alt="avatar"
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                />)}
            <Stack spacing={1} sx={{
                overflowY: 'auto',
                width: '100%',
            }}>
                {/* Username, updated time */}
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        {currentUser?.username || 'Anonymous'}
                    </Typography>
                </Stack>
                {/* Content TextField */}
                {<TextField
                    value={state?.content}
                    onChange={(e) => setState({ ...state, content: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddComment();
                        }
                    }}
                    size="small"
                    placeholder="Add a comment..."
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    onFocus={() => setState({ ...state, isFocused: true })}
                    onBlur={() => setState({ ...state, isFocused: false })}
                    slotProps={{
                        input: {
                            endAdornment:
                                state?.isFocused && <Stack direction={'row'} spacing={1}>
                                    <Divider orientation="vertical" flexItem />
                                    {/* Cancel reply button */}
                                    <Button
                                        onClick={() => setState({ ...state, isFocused: false })}
                                        onMouseDown={(e) => e.preventDefault()}
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: '10px',
                                            backgroundColor: 'transparent',
                                            ":hover": {
                                                backgroundColor: 'lightgray',
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontSize={'14px'}
                                            fontWeight={'bold'}
                                            sx={{ color: 'black' }}>
                                            Cancel
                                        </Typography>
                                    </Button>
                                    {/* Send Reply button */}
                                    <Button
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={handleAddComment}
                                        disabled={!state?.content || state?.content.length === 0}
                                        variant="contained"
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: '10px',
                                            backgroundColor: '#EA284E',
                                        }}
                                    >
                                        < Typography
                                            variant="body2"
                                            fontSize={'14px'}
                                            fontWeight={'bold'}
                                            sx={{
                                                color: state?.content && state.content.length === 0 ? 'black' : 'white',
                                            }}
                                        >
                                            Comment
                                        </Typography>
                                    </Button>
                                </Stack>,
                            sx: {
                                borderRadius: '10px',
                                backgroundColor: '#F8F8F8',
                            }
                        }
                    }}
                />}
            </Stack>
        </Stack >
    );
}