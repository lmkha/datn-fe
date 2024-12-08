'use client';

import { Stack } from "@mui/material";
import ParentCommentComponent from "./parent-comment";
import { ParentComment } from "../../types";
import YourCommentComponent from "./your-comment";

interface CommentSectionProps {
    comments?: ParentComment[];
}

export default function CommentSection(props: CommentSectionProps) {
    return (
        <Stack sx={{
            borderBottom: '1px solid lightgray',
        }}>
            <YourCommentComponent
                key={-1}
            />
            {props?.comments?.map((comment, index) => (
                <ParentCommentComponent
                    key={index}
                    comment={comment}
                />
            ))}
        </Stack>
    );
}
