'use client';

import { Typography, Box } from '@mui/material';

export default function QuoteSection() {
    return (
        <Box
            sx={{
                height: '100%',
                backgroundImage: `url('/images/login-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                alignItems: 'flex-start',
                borderRadius: 4,
            }}
        >
            <Box sx={{ padding: 2, paddingBottom: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Your videos, your world
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    A platform to share your videos with the world. Sign up now to get started.
                </Typography>
            </Box>
        </Box>

    );
};
