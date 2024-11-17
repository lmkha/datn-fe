import { Box } from "@mui/material";
import { RecommendedVideo } from "../../types";

interface RecommendVideoComponentProps {
    recommendedVideo?: RecommendedVideo;
}
export default function RecommendVideoComponent(props: RecommendVideoComponentProps) {
    return (
        <Box sx={{
            backgroundColor: 'gray',
            width: '100%',
            height: '215px',
            padding: '10px',
            borderRadius: '10px',
        }}>
            Recommend video
        </Box>
    );
}