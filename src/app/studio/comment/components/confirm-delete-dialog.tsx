'use client';

import UserAvatar from "@/core/components/avatar";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Stack, Typography } from "@mui/material";

interface DeleteCommentDialogProps {
    open: boolean;
    comment?: any;
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
                <Typography variant="h6" fontWeight={'bold'}>Delete Comment</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}>
                    <Stack spacing={2}>
                        <Typography variant="body1" fontWeight={'bold'} color="textPrimary" >Are you sure you want to delete this comment?</Typography>
                        <Grid2 container spacing={1}>
                            <Grid2 size={2}>
                                <UserAvatar
                                    src={props.comment?.userAvatar}
                                    size={40}
                                />
                            </Grid2>
                            <Grid2 size={10}>
                                <Stack>
                                    <Typography variant="body1" fontWeight={'bold'}>@{props.comment?.username}</Typography>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {props.comment?.content}
                                    </Typography>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
            }}>
                <Button
                    onClick={props.onClose}
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
