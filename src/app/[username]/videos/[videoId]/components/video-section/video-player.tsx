import { Box } from "@mui/material";

interface VideoPlayerProps {
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
            }}
                onClick={() => { props.changeTheaterMode && props.changeTheaterMode() }}
            >
                Video player
            </Box>
        </>
    );
}
