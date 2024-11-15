'use client';

import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

// Videos of a user
export default function VideosPage() {
    const { username } = useParams();
    return (
        <>
            <Typography>Videos of {username}</Typography>
        </>
    );
}
