'use client';

import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get } from "@/hooks/use-local-storage";
import { addComment } from "@/services/real/comment";
import UserAvatar from "@/core/components/avatar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "next/navigation";

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
            console.log('focused');
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

            <LoginRequestDialog
                open={state?.openLoginRequestDialog}
                onClose={() => setState({ ...state, openLoginRequestDialog: false })}
            />
        </Stack >
    );
}

interface LoginRequestDialogProps {
    open?: boolean;
    onClose?: () => void;
}
export function LoginRequestDialog(props: LoginRequestDialogProps) {
    const router = useRouter();

    const handleLogin = async () => {
        props.onClose && props.onClose();
        router.push('/login');
    };

    return (
        <Dialog
            open={props.open || false}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h6" fontWeight={'bold'}>Login Required</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body1" fontWeight={600}>You need to login to comment.</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClose}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        color: 'black',
                    }}
                >
                    <Typography variant="body1" fontWeight={600}>Cancel</Typography>
                </Button>
                <Button
                    // autoFocus
                    onClick={handleLogin}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#EA284E',
                        color: 'white',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>Login</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
