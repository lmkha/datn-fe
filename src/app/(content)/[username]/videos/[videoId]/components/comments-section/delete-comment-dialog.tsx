'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";

interface DeleteCommentDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}
export default function DeleteCommentDialog(props: DeleteCommentDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Comment
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}>
                    Delete your comment permanently?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
            }}>
                <Button
                    onClick={() => {
                        props.onDelete();
                        props.onClose();
                    }}
                    color="inherit"
                    autoFocus
                    variant="outlined"
                    sx={{
                        width: '40%',
                        height: '50px',
                        color: 'black',
                        borderRadius: '10px',
                        textTransform: 'none',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>Cancel</Typography>
                </Button>
                <Button
                    onClick={props.onDelete}
                    autoFocus
                    variant="contained"
                    sx={{
                        width: '40%',
                        height: '50px',
                        backgroundColor: '#EA284E',
                        color: 'white',
                        borderRadius: '10px',
                        textTransform: 'none',
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>Delete</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}