'use client';

import { Stack, Typography } from "@mui/material";
import ParentCommentComponent from "./parent-comment";
import { ParentComment } from "../../types";
import YourCommentComponent from "./your-comment";
import { useEffect, useState } from "react";
import { getAllParentComments } from "@/services/real/comment";

interface CommentSectionProps {
    videoId: string;
    author: any;
    isCommentFocused: boolean;
    isCommentOff?: boolean | null;
    onCommentUnfocused?: () => void;
}

export default function CommentSection(props: CommentSectionProps) {
    if (props?.isCommentOff) {
        return (
            <Stack sx={{
                py: 5,
                px: 2,
            }}>
                <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    sx={{
                        color: 'gray'
                    }}
                >
                    Comments are turned off for this video.
                </Typography>
            </Stack>
        )
    }

    const [comments, setComments] = useState<ParentComment[]>();

    const fetchData = async () => {
        if (!props.videoId) return;
        const result = await getAllParentComments(props.videoId);
        if (result.success) {
            setComments(result.comments);
        }
    };

    useEffect(() => {
        fetchData();
    }, [props.videoId]);

    return (
        <Stack sx={{
            borderBottom: '1px solid lightgray',
            paddingTop: '10px',
        }}>
            <YourCommentComponent
                isFocused={props.isCommentFocused}
                onCommentUnfocused={props.onCommentUnfocused}
                key={-1}
                videoId={props.videoId}
                onCommented={() => {
                    fetchData();
                }}
            />
            {comments?.map((comment, index) => (
                <ParentCommentComponent
                    key={comment.id}
                    videoId={props.videoId}
                    comment={comment}
                    author={props.author}
                />
            ))}
        </Stack>
    );
}
