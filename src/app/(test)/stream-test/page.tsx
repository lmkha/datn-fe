'use client'

import React from "react";
import VideoPlayer from "./video-player";

export default function StreamTestPage() {
    if (typeof window === "undefined") return null;
    return (
        <>
            <VideoPlayer src="http://localhost:8000/output_video.mpd" />
        </>
    );
}

