import { Box, SxProps, Theme } from "@mui/material";
import { CldImage } from "next-cloudinary";
import Image from "next/legacy/image";
import { HTMLAttributes } from "react";

interface VideoThumbnailProps extends HTMLAttributes<HTMLDivElement> {
    thumbnailUrl?: string;
    sx?: SxProps<Theme>;
}

export default function VideoThumbnail(props: VideoThumbnailProps) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                '&:hover .video-title': {
                    opacity: 1,
                    visibility: 'visible',
                },
                ...props.sx,
            }}
            {...props}
        >
            {props?.thumbnailUrl ? (
                <CldImage
                    fill={true}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    src={props.thumbnailUrl}
                    alt="Image"
                />
            ) : (
                <Image
                    src="/images/video-image.png"
                    alt="Image"
                    layout="fill"
                    objectFit="revert"
                />
            )}
        </Box>
    )
}
