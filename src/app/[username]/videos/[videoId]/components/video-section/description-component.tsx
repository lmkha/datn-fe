'use client';

import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function DescriptionComponent() {
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
                border: "1px solid lightgray",
                borderTop: "none",
                transition: "max-height 0.3s ease",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
            }}
            onClick={() => setShowMore(!showMore)}
        >
            <Box>
                <Box component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body1">VTV Thể Thao</Typography>
                    <Typography variant="body1"> Kênh Youtube về thể thao của Đài Truyền hình Việt Nam</Typography>
                    <Typography variant="body1"> Hãy đăng ký kênh để cập nhật những thông tin mới nhất về thể thao Việt Nam và thế giới</Typography>
                    <Typography variant="body1"> Subscribe kênh: / @vtvthethaoofficial</Typography>
                    <Typography variant="body1"> Web: https://thethao.vtv.vn/</Typography>
                    <Typography variant="body1"> Fanpage: / banthethaovtv</Typography>
                    <Typography variant="body1"> Tiktok: / thethaovtvofficial</Typography>
                    <Typography variant="body1"> -------------------------------------------------</Typography>
                    <Typography variant="body1"> © Bản quyền thuộc về Ban Thể thao - Đài Truyền hình Việt Nam</Typography>
                    <Typography variant="body1"> #fifaworldcup #worldcup #worldcup2022 #thethao.vtv #vtv #vtvsports #bongda #thethao #bongdavtv #SEAGames #thethao247 #SEAGames31</Typography>
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