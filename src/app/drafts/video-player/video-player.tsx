import React, { useEffect } from 'react';
import videojs from 'video.js';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, { controls: true, autoplay: false });
            player.src({ src: url, type: 'video/mp4' });

            return () => {
                player.dispose(); // Cleanup
            };
        }
    }, [url]);

    return (
        <div>
            <video ref={videoRef} className="video-js" />
        </div>
    );
};

export default VideoPlayer;