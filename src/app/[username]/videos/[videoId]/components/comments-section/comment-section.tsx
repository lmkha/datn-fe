'use client';

import { Stack } from "@mui/material";
import CommentComponent from "./comment-component";
import { Comment } from "../../types";

interface CommentSectionProps {
    comments?: Comment[];
}

export default function CommentSection(props: CommentSectionProps) {
    return (
        <Stack sx={{
            borderBottom: '1px solid lightgray',
        }}>
            {props?.comments?.map((comment, index) => (
                <CommentComponent key={index} comment={comment} />
            ))}
        </Stack>
    );
}
