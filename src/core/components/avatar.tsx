'use client'

import { Avatar, Box, SxProps, Theme } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { HTMLAttributes } from "react";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    size?: number;
    sx?: SxProps<Theme>;
}

export default function UserAvatar(props: UserAvatarProps) {
    const { src, size = 100, sx, ...rest } = props;

    return (
        <>
            {src ? (
                <Box
                    sx={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        ...sx,
                    }}
                    {...rest}
                >
                    <CldImage
                        fill
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                        src={src}
                        alt="User Image"
                    />
                </Box>
            ) : (
                <Avatar
                    src="/images/avatar.png"
                    alt="avatar"
                    sx={{
                        width: size,
                        height: size,
                        ...sx,
                    }}
                    {...rest}
                />
            )}
        </>
    );
}
