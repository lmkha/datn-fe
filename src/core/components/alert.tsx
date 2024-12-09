'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { useAppContext } from '@/contexts/app-context';

export default function AlertComponent() {
    const { alertState, showAlert, hideAlert } = useAppContext();

    const handleChange = () => {
        if (!alertState.isOpen) {
            showAlert('This is a success Alert.', 'success');
        } else {
            hideAlert();
        }
    };

    React.useEffect(() => {
        if (alertState.isOpen) {
            const timer = setTimeout(() => {
                hideAlert();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertState.isOpen, hideAlert]);

    return (
        <Box sx={{ height: 200, width: 300, position: 'relative', zIndex: 1000 }}>
            <FormControlLabel
                control={<Switch checked={alertState.isOpen} onChange={handleChange} />}
                label="Show Alert"
            />
            <Slide direction="down" in={alertState.isOpen} mountOnEnter unmountOnExit>
                <Alert
                    variant='filled'
                    severity={alertState.severity}
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'auto',
                    }}
                >
                    {alertState.text}
                </Alert>
            </Slide>
        </Box>
    );
}
