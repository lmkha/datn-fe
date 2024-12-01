'use client';

import { Button, Typography } from "@mui/material";
import * as React from 'react';
import { useRef } from 'react';

interface VideoUploadButtonProps {
    onChange?: (file: File) => void;
}
export default function VideoUploadButton(props: VideoUploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.onChange?.(file);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="inherit"
                sx={{
                    textTransform: 'none',
                    width: '200px',
                }}
                onClick={handleButtonClick}
            >
                <Typography>Change video</Typography>
            </Button>

            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
        </>
    );
};