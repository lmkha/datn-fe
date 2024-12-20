'use client';

import { Button, Typography } from "@mui/material";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "next/navigation";


interface RequestLoginDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    submitText?: string;
    cancelText?: string;
}
export default function RequestLoginDialog(props: RequestLoginDialogProps) {
    const router = useRouter();

    const handleLogin = async () => {
        props.onClose();
        router.push('/login');
    };

    return (
        <Dialog
            open={props.open || false}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h6" fontWeight={'bold'}>{props?.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body1" fontWeight={600}>{props?.description}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClose}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        color: 'black',
                    }}
                >
                    <Typography variant="body1" fontWeight={600}>{props?.cancelText}</Typography>
                </Button>
                <Button
                    // autoFocus
                    onClick={handleLogin}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#EA284E',
                        color: 'white',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>{props?.submitText}</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
