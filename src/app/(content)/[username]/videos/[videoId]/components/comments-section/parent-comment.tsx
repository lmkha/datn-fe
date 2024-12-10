'use client';

import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from "react";
import { ChildComment, ParentComment } from "../../types";
import { getAllChildCommentsOfParentComment_Mock } from "@/services/mock/comment";
import ChildCommentComponent from "./child-comment";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { formatTimeToShortText } from "@/core/logic/convert";

interface State {
    liked?: boolean;
    expanded?: boolean;
    openReply?: boolean;
    replyContent?: string;
    childrenComments?: ChildComment[];
}
interface CommentProps {
    comment?: ParentComment;
    onLike?: () => void;
    onUnLike?: () => void;
}
export default function ParentCommentComponent(props: CommentProps) {
    const router = useRouter();
    const [state, setState] = useState<State>();

    useEffect(() => {
        if (props.comment?.id && state?.expanded) {
            getAllChildCommentsOfParentComment_Mock(props.comment?.id).then((children) => {
                setState({ ...state, childrenComments: children });
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
                {props?.comment?.userAvatar ? (<Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                }}
                    onClick={() => {
                        props?.comment?.username &&
                            router.push(`/@${props.comment.username}`);
                    }}
                >
                    <CldImage
                        fill={true}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                        src={props.comment.userAvatar}
                        alt="Image"
                    />
                </Box>) :
                    (<Avatar
                        src="/images/avatar.png"
                        alt="avatar"
                        sx={{
                            width: 40,
                            height: 40,
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            props?.comment?.username &&
                                router.push(`/@${props.comment.username}`);
                        }}
                    />)
                }
                <Stack sx={{
                    overflowY: 'auto',
                    width: '100%',
                }}>
                    {/* Username, updated time */}
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        {/* Username */}
                        <Typography variant="body1" fontWeight={'bold'}>
                            {props?.comment?.username}
                        </Typography>
                        {/* created at */}
                        <Typography variant="body2">
                            {formatTimeToShortText(props.comment?.createdAt || '')}
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
                    {/* Like, Open Reply button */}
                    <Stack direction={'row'} spacing={4}>
                        <Stack direction={'row'} spacing={1} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <IconButton onClick={(event) => {
                                event.stopPropagation();
                                setState({ ...state, liked: !state?.liked });
                            }}>
                                {state?.liked ? <FavoriteRoundedIcon sx={{ color: '#EA284E' }} /> : <FavoriteBorderOutlinedIcon />}
                            </IconButton>
                            <Typography variant="body2">{props.comment?.likes}</Typography>
                        </Stack>
                        {/* Open Reply TextField */}
                        <Button
                            onClick={() => setState({ ...state, openReply: !state?.openReply })}
                            size="small"
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
                                fontSize={'12px'}
                                fontWeight={'bold'}
                                sx={{ color: 'black' }}>
                                Reply
                            </Typography>
                        </Button>
                    </Stack>
                    {/* Reply TextField */}
                    {state?.openReply && <TextField
                        value={state?.replyContent}
                        onChange={(e) => setState({ ...state, replyContent: e.target.value })}
                        size="small"
                        placeholder="Add a reply..."
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment:
                                    <Stack direction={'row'} spacing={1}>
                                        <Divider orientation="vertical" flexItem />
                                        {/* Cancel reply button */}
                                        <Button
                                            onClick={() => setState({ ...state, openReply: false })}
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
                                                    color: state?.replyContent && state?.replyContent.length === 0 ? 'black' : 'white',
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
                        {state?.expanded &&
                            state?.childrenComments &&
                            state.childrenComments.map((child) => <ChildCommentComponent comment={child} />)}
                    </Stack>
                </Stack>
            </Stack >
        </Stack >
    );
}