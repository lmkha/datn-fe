'use client';

import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get } from "@/hooks/use-local-storage";
import { addComment } from "@/services/real/comment";
import UserAvatar from "@/core/components/avatar";
import RequestLoginDialog from "@/core/components/require-login-dialog";

interface State {
    expanded?: boolean;
    isFocused?: boolean;
    content?: string;
    openLoginRequestDialog?: boolean;
}

interface CommentProps {
    videoId: string;
    isFocused?: boolean;
    onCommented?: () => void;
    onCommentUnfocused?: () => void;
}
export default function YourCommentComponent(props: CommentProps) {
    const contentRef = React.useRef<HTMLInputElement>(null);
    const [state, setState] = useState<State>();
    const currentUser = get<any>('user');
    const isLogged = get<string>("accessToken") ? true : false;

    const handleAddComment = async () => {
        if (!isLogged) {
            setState({ ...state, openLoginRequestDialog: true });
            return;
        }
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

    useEffect(() => {
        if (props?.isFocused) {
            setState((prevState) => ({ ...prevState, expanded: true, isFocused: true }));
            setTimeout(() => {
                contentRef.current?.focus();
            }, 0);
        } else {
            setState((prevState) => ({ ...prevState, isFocused: false }));
            props?.onCommentUnfocused && props.onCommentUnfocused();
        }
    }, [props?.isFocused]);

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
            <UserAvatar
                src={currentUser?.profilePic}
                size={40}
            />
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
                    inputRef={contentRef}
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    onFocus={() => {
                        setState({ ...state, isFocused: true });
                        props?.onCommentUnfocused && props.onCommentUnfocused();
                    }}
                    onBlur={() => {
                        setState({ ...state, isFocused: false });
                        props?.onCommentUnfocused && props.onCommentUnfocused();
                    }}
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

            <RequestLoginDialog
                open={state?.openLoginRequestDialog || false}
                onClose={() => setState({ ...state, openLoginRequestDialog: false })}
                title="Login Required"
                description="You need to login to comment."
                submitText="Login"
                cancelText="Cancel"
            />
        </Stack >
    );
}
