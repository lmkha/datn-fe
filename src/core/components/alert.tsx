'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { useAppContext } from '@/contexts/app-context';

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
            <Alert
                variant='filled'
                severity={alertState.severity}
                sx={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: 'auto',
                    width: 'auto',
                    zIndex: 1000,
                    outline: '1px solid red',
                }}
            >
                {alertState.text}
            </Alert>

        </Slide>
    );
}
