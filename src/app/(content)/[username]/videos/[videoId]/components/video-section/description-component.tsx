'use client';

import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface DescriptionComponentProps {
    description?: string;
}
export default function DescriptionComponent(props: DescriptionComponentProps) {
    const [showMore, setShowMore] = useState(false);
    return (
        <Box
            sx={{
                width: "100%",
                height: showMore ? "auto" : undefined,
                maxHeight: showMore ? "1000px" : "50px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                borderTop: "none",
                transition: "max-height 0.3s ease",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
            }}
            onClick={() => setShowMore(!showMore)}
        >
            <Box>
                <Box component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body1">
                        {props?.description}
                    </Typography>
                </Box>
            </Box>

            {!showMore && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "24px",
                        background: "linear-gradient(transparent, white)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: "bold",
                    }}
                >
                    show more
                </Box>
            )}
        </Box>

    );
}