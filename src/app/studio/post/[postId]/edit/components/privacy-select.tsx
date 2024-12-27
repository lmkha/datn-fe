'use client';

import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';

interface WhoCanWatchViewSelectProps {
    privacy?: string;
    options?: string[];
    onChange?: (privacy: string) => void;
};
export default function WhoCanWatchViewSelect(props: WhoCanWatchViewSelectProps) {
    const [privacy, setPrivacy] = React.useState('');

    React.useEffect(() => {
        setPrivacy(props.privacy || '');
    }, [props.privacy]);

    const handleChange = (event: SelectChangeEvent) => {
        setPrivacy(event.target.value);
        props.onChange?.(event.target.value);
    };

    return (
        <Box>
            <Typography fontWeight="bold" mb={1}>
                Who can watch this video
            </Typography>
            <FormControl fullWidth>
                <Select
                    size="small"
                    value={privacy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select visibility' }}
                >
                    {props.options?.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
