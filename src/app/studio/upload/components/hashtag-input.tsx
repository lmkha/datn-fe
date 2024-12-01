'use client';

import { Box, Input } from "@mui/material";
import { useState } from "react";
import { Chip } from '@mui/material';
import * as React from 'react';


interface HashtagInputProps {
    onChange?: (hashtags: string[]) => void;
}
export default function HashtagInput(props: HashtagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (inputValue.trim()) {
                setHashtags((prevHashtags) => [
                    ...prevHashtags,
                    inputValue.trim()
                ]);
                props.onChange?.(
                    [...hashtags, inputValue.trim()]
                );
                setInputValue('');
            }
        }
    };

    const handleDeleteHashtag = (hashtagToDelete: string) => {
        setHashtags((prevHashtags) =>
            prevHashtags.filter((hashtag) => hashtag !== hashtagToDelete)
        );
        props.onChange?.(hashtags);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
                borderRadius: 1,
                border: '1px solid lightgray',
                "&:focus-within": {
                    border: '1px solid black',
                },
            }}
        >
            {hashtags.map((hashtag, index) => (
                <Chip
                    key={index}
                    label={`#${hashtag}`}
                    onDelete={() => handleDeleteHashtag(hashtag)}
                />
            ))}

            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Hashtags"
                disableUnderline={true}
                sx={{
                    flexGrow: 1,
                    padding: '8px',
                    borderRadius: '5px',
                }}
            />
        </Box>

    );
}
