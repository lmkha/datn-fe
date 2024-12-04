'use client';

import { addComment } from "@/services/real/comment";
import { Button } from "@mui/material";

export default function TestPage() {
    const handleClick = async () => {
        addComment({ videoId: "674f0649aa9dc1224a4ff58d", content: "Đẳng cấp barca" });
    }

    return (
        <div>
            <Button onClick={handleClick}>Add Comment</Button>
        </div>
    )
}