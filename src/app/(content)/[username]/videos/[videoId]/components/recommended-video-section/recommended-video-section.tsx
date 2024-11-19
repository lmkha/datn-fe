'use client';

import { Stack } from "@mui/material";
import RecommendVideoComponent from "./recommended-video-component";
import { RecommendedVideo } from "../../types";

interface RecommendedVideoSectionProps {
    recommendedVideos?: RecommendedVideo[];
}
export default function RecommendedVideoSection(props: RecommendedVideoSectionProps) {
    return (

        <Stack spacing={1}>
            {props?.recommendedVideos?.map((recommendVideo, index) => (
                <RecommendVideoComponent key={index} recommendedVideo={recommendVideo} />
            ))}
        </Stack>
    );
}
