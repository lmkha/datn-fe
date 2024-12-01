import { Box } from "@mui/material";
import Image from "next/legacy/image";
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    videoLink: string;
    changeTheaterMode?: () => void;
}
export default function VideoPlayerComponent(props: VideoPlayerProps) {
    return (
        <>
            <Box sx={{
                backgroundColor: 'black',
                width: '100%',
                height: '530px',
                borderRadius: '10px',
            }}>
                {/* Video player */}
                <ReactPlayer
                    forcedash="true"
                    url={props.videoLink}
                    controls={true}
                    width="100%"
                    height="100%"
                    light={
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            <Image
                                src="/images/video-image.jpg"
                                alt="Image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    }
                    playing={true}
                    onStart={() => console.log('Video started')}
                    onEnded={() => console.log('Video ended')}
                />
            </Box>
        </>
    );
}


