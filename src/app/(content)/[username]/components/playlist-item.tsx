'use client';

import { Grid2, Typography } from "@mui/material";

interface PlaylistItemProps {
    index: number;
}
export default function PlaylistItem(props: PlaylistItemProps) {
    return (
        <Grid2
            key={props.index}
            minHeight={100}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 6,
            }}
            sx={{
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Playlist {props.index + 1}
            </Typography>
        </Grid2>
    );
}
