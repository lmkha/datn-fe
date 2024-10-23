'use client';

import { useParams } from "next/navigation";

export default function VideoPage() {
    const { username, videoId } = useParams();
    return (
        <div>
            <h1>Video {videoId} of {username}</h1>
        </div>
    );
}
