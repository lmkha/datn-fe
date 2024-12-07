'use client';

import { Grid2, Typography } from "@mui/material";

interface LikedVideoProps {
    index: number;
}
export default function LikedVideo(props: LikedVideoProps) {
    return (
        <Grid2
            key={props.index}
            minHeight={170}
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
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
                Liked video {props.index + 1}
            </Typography>
        </Grid2>
    );
}
