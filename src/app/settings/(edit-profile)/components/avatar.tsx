'use client';

import { Avatar, Box, Typography } from "@mui/material";
import * as React from 'react';
import { CldImage } from "next-cloudinary";

interface AvatarComponentProps {
    onAvatarFileChange: (file: File) => void;
    oldAvatarSrc?: string;
    refresh?: boolean;
    onDoneRefresh?: () => void;
}
export default function AvatarComponent(props: AvatarComponentProps) {
    const [selected, setSelected] = React.useState(false);
    const [avatarSrc, setAvatarSrc] = React.useState("/images/avatar.png");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setAvatarSrc(imageURL);
            props.onAvatarFileChange(file);
            setSelected(true);
        }
    };

    React.useEffect(() => {
        if (props.refresh) {
            setAvatarSrc("/images/avatar.png");
            setSelected(false);
            props.onDoneRefresh?.();
        }
    }, [props.refresh]);

    return (
        <Box
            position="relative"
            width={300}
            height={300}
            onClick={() => document.getElementById("avatarInput")?.click()}
            sx={{
                cursor: "pointer",
                backgroundColor: 'black',
                borderRadius: '50%',
            }}
        >
            {/* Avatar */}
            {(!props.oldAvatarSrc || selected) &&
                <Avatar
                    src={avatarSrc}
                    alt="avatar"
                    sx={{
                        width: 300,
                        height: 300,
                    }}
                />
            }

            {props.oldAvatarSrc && !selected &&
                <CldImage
                    fill={true}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                    }}
                    src={props.oldAvatarSrc}
                    alt="Image"
                />
            }

            {/* Overlay */}
            <Box
                borderRadius={50}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.6)"
                color="white"
                sx={{
                    opacity: 0,
                    transition: "opacity 0.3s",
                    ":hover": {
                        opacity: 1,
                    },
                }}
            >
                <Typography variant="h6">Change Avatar</Typography>
            </Box>

            <input
                hidden
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </Box>
    );
}
