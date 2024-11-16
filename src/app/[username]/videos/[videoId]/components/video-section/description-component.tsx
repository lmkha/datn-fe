'use client';

import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function DescriptionComponent() {
    const [showMore, setShowMore] = useState(false);
    return (
        <Box
            sx={{
                marginTop: 1,
                width: "100%",
                height: showMore ? "auto" : undefined,
                maxHeight: showMore ? "1000px" : "50px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                border: "1px solid lightgray",
                borderRadius: "10px",
                transition: "max-height 0.3s ease",
            }}
            onClick={() => setShowMore(!showMore)}
        >
            <Box
                sx={{
                    padding: "10px",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        whiteSpace: "pre-wrap",
                    }}
                >
                    -------------------------------------------------
                    Kênh Youtube về thể thao của Đài Truyền hình Việt Nam
                    Subscribe kênh: / @vtvthethaoofficial
                    Web: https://thethao.vtv.vn/
                    Fanpage: / banthethaovtv
                    Tiktok: / thethaovtvofficial
                    -------------------------------------------------
                    © Bản quyền thuộc về Ban Thể thao - Đài Truyền hình Việt Nam
                    #fifaworldcup #worldcup #worldcup2022 #thethao.vtv #vtv #vtvsports #bongda #thethao #bongdavtv #SEAGames #thethao247 #SEAGames31
                </Typography>
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