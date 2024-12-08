'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Filter() {
    const [alignment, setAlignment] = React.useState('latest');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="latest" aria-label="left aligned" sx={{ textTransform: 'none' }}>
                    Latest
                </ToggleButton>
                <ToggleButton value="oldest" aria-label="right aligned" sx={{ textTransform: 'none' }}>
                    Oldest
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}
