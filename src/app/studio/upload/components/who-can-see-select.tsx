'use client';

import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';

export default function WhoCanWatchViewSelect() {
    const [visibility, setVisibility] = React.useState('public');

    const handleChange = (event: SelectChangeEvent) => {
        setVisibility(event.target.value);
    };

    return (
        <Box>
            <Typography fontWeight="bold" mb={1}>
                Who can watch this video
            </Typography>
            <FormControl fullWidth>
                <Select
                    size="small"
                    value={visibility}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select visibility' }}
                >
                    <MenuItem value="public">Everyone</MenuItem>
                    <MenuItem value="followers">Followers</MenuItem>
                    <MenuItem value="private">Only you</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
