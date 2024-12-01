'use client';

import { Button, Typography } from "@mui/material";
import * as React from 'react';
import { useRef } from 'react';

interface ThumbnailUploadButtonProps {
    onChange?: (file: File) => void;
}

export default function ThumbnailUploadButton(props: ThumbnailUploadButtonProps) {
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
                    width: '100%',
                }}
                onClick={handleButtonClick}
            >
                <Typography>Choose thumbnail</Typography>
            </Button>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
        </>
    );
};
