'use client';

import { Stack } from "@mui/material";
import RecommendVideoComponent from "./recommend-video-component";

export default function RecommendSection() {
    return (

        <Stack spacing={1} px={1}>
            <RecommendVideoComponent />
            <RecommendVideoComponent />
            <RecommendVideoComponent />
            <RecommendVideoComponent />
            <RecommendVideoComponent />
            <RecommendVideoComponent />
            <RecommendVideoComponent />
        </Stack>
    );
}