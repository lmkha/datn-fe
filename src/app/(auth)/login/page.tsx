'use client';

import { Grid2, Box, Typography } from '@mui/material';
import QuoteSection from './components/quote-section';
import LoginForm from './components/login-form';

export default function Page() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <Grid2 container sx={{
                backgroundColor: 'white',
                height: '95%',
                width: '70%',
                borderRadius: 4,
            }}>
                <Grid2 size={6} sx={{
                    padding: 2,
                }}>
                    <QuoteSection />
                </Grid2>

                <Grid2 size={6} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LoginForm />
                </Grid2>
            </Grid2>
        </Box>
    );
};
