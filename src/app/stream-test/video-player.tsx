// video-player.tsx
import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && videoRef.current) {
            // This ensures that the code only runs in the browser
            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, src, true);
        }
    }, [src]);

    return <video ref={videoRef} controls style={{ width: "100%", height: "auto" }} />;
};

export default VideoPlayer;
