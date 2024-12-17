'use client';

import * as React from 'react';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { useAppContext } from '@/contexts/app-context';
import { Box } from '@mui/material';

export default function AlertComponent() {
    const { alertState, hideAlert } = useAppContext();

    React.useEffect(() => {
        if (alertState.isOpen) {
            const timer = setTimeout(() => {
                hideAlert();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertState.isOpen, hideAlert]);

    return (
        <Slide direction="down" in={alertState.isOpen} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    position: 'fixed',
                    top: '20px',
                    left: '0px',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Alert
                    variant='filled'
                    severity={alertState.severity}
                    sx={{
                        width: 'auto',
                        height: 'auto',
                    }}
                >
                    {alertState.text}
                </Alert>
            </Box>

        </Slide>
    );
}
