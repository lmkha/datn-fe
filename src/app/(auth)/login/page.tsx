'use client';

import { Grid2, Box } from '@mui/material';
import QuoteSection from './components/quote-section';
import LoginForm from './components/login-form';

export default function Page() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #EA284E, #F5A7C5, #FF6F61)'
            }}
        >
            <Grid2 container sx={{
                backgroundColor: 'white',
                height: '95%',
                width: '70%',
                borderRadius: 4,
                border: '1px solid #e0e0e0',
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
