'use client';

import { useAppContext } from "@/contexts/app-context";
import { Box, Button } from "@mui/material";

export default function TestPage() {
    const { showAlert } = useAppContext();

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
        }}>
            <Box sx={{
                backgroundColor: 'red',
                width: '50%',
                height: '100px'
            }} />
            <Button variant="contained" color="success"
                onClick={() => {
                    showAlert({ message: 'CheckVar', severity: 'info' });
                }}
            >Show Alert</Button>
        </Box>
    );
}