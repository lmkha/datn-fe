'use client';

import { Stack } from "@mui/material";
import ParentCommentComponent from "./parent-comment";
import { ParentComment } from "../../types";
import YourCommentComponent from "./your-comment";
import { useState } from "react";
import { getAllParentCommentsOfVideo_Mock } from "@/services/mock/comment";

interface CommentSectionProps {
    videoId: string;
}

export default function CommentSection(props: CommentSectionProps) {
    const [comments, setComments] = useState<ParentComment[]>();

    const fetchData = async () => {
        getAllParentCommentsOfVideo_Mock(props.videoId).then((result) => {
            setComments(result);
        });
    };

    return (
        <Stack sx={{
            borderBottom: '1px solid lightgray',
        }}>
            <YourCommentComponent
                key={-1}
                videoId={props.videoId}
            />
            {comments?.map((comment, index) => (
                <ParentCommentComponent
                    key={index}
                    comment={comment}
                />
            ))}
        </Stack>
    );
}
