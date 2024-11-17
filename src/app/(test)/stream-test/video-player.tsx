// video-player.tsx
import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && videoRef.current) {
            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, src, true);
        }
    }, [src]);

    return <
        video
        ref={videoRef}
        controls
        className='video-js vjs-default-skin vjs-big-play-centered'
    />;
};

export default VideoPlayer;
