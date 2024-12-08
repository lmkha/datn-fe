'use client';

import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChildComment, ParentComment } from "../../types";
import { getAllChildCommentsOfParentComment_Mock } from "@/services/mock/comment";
import ChildCommentComponent from "./child-comment";
import { get } from "@/hooks/use-local-storage";
import { CldImage } from "next-cloudinary";

interface State {
    expanded?: boolean;
    isFocused?: boolean;
    replyContent?: string;
    childrenComments?: ChildComment[];
}

interface CommentProps {
    comment?: ParentComment;
    onLike?: () => void;
    onUnLike?: () => void;
}
export default function YourCommentComponent(props: CommentProps) {
    const [state, setState] = useState<State>();
    const currentUser = get('user');

    useEffect(() => {
        if (props.comment?.id && state?.expanded) {
            getAllChildCommentsOfParentComment_Mock(props.comment?.id).then((children) => {

            });
        }
    }, [state?.expanded]);

    return (
        <Stack>
            {/* Parent */}
            <Stack direction={'row'} spacing={2} sx={{
                width: '100%',
                minHeight: '50px',
                borderTop: '1px solid lightgray',
                borderLeft: '1px solid lightgray',
                borderRight: '1px solid lightgray',
                cursor: 'pointer',
            }}>
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
                <Stack sx={{
                    overflowY: 'auto',
                    width: '100%',
                }}>
                    {/* Username, updated time */}
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Typography variant="body1" fontWeight={'bold'}>
                            {currentUser?.username || 'Anonymous'}
                        </Typography>
                    </Stack>
                    {/* Content */}
                    <Typography
                        variant="body2"
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'revert',
                            WebkitLineClamp: state?.expanded ? 'none' : 2,
                        }}
                    >
                        {props.comment?.content}
                    </Typography>
                    {/* Reply TextField */}
                    {<TextField
                        value={state?.replyContent}
                        onChange={(e) => setState({ ...state, replyContent: e.target.value })}
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
                                            variant="contained"
                                            disabled={!state?.replyContent || state?.replyContent.length === 0}
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
                                                    color: state?.replyContent && state.replyContent.length === 0 ? 'black' : 'white',
                                                }}>
                                                Reply
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
                    {/* Show Children comments button*/}
                    <Button
                        onClick={() => setState({ ...state, expanded: !state?.expanded })}
                        sx={{
                            width: '100px',
                            textTransform: 'none',
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            sx={{ color: 'black' }}>
                            {
                                props.comment?.replyCount && props.comment?.replyCount > 0 ? props.comment?.replyCount > 1 ? `View ${props.comment?.replyCount} replies` : `View ${props.comment?.replyCount} reply`
                                    : ""
                            }
                        </Typography>
                    </Button>

                    {/* Children comments */}
                    <Stack>
                        {state?.expanded && state?.childrenComments?.map((child) => <ChildCommentComponent comment={child} />)}
                    </Stack>
                </Stack>
            </Stack >
        </Stack >
    );
}