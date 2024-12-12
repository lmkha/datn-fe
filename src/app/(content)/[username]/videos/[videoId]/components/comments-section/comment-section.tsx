'use client';

import { Stack } from "@mui/material";
import ParentCommentComponent from "./parent-comment";
import { ParentComment } from "../../types";
import YourCommentComponent from "./your-comment";
import { useEffect, useState } from "react";
import { getAllParentComments } from "@/services/real/comment";

interface CommentSectionProps {
    videoId: string;
    author: any
}

export default function CommentSection(props: CommentSectionProps) {
    const [comments, setComments] = useState<ParentComment[]>();

    const fetchData = async () => {
        if (!props.videoId) return;
        getAllParentComments(props.videoId).then((result) => {
            if (result.success) {
                setComments(result.comments);
            }
        });
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
                key={-1}
                videoId={props.videoId}
                onCommented={() => {
                    fetchData();
                }}
            />
            {comments?.map((comment, index) => (
                <ParentCommentComponent
                    key={index}
                    videoId={props.videoId}
                    comment={comment}
                    author={props.author}
                />
            ))}
        </Stack>
    );
}
