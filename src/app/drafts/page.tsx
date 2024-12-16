'use client';

import { useAppContext } from "@/contexts/app-context";
import { Button, Stack, Typography } from "@mui/material";

export default function DraftPage() {
    const { alertState, showAlert, hideAlert } = useAppContext();
    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Typography>
                Draft Page
            </Typography>
            <Button
                onClick={() => {
                    showAlert({ message: 'Hello', severity: 'success' });
                }}
            >
                Check
            </Button>
        </Stack>
    );
}
