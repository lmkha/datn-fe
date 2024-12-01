'use client';

import { Box, Button, Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/legacy/image";

interface CreateNewPlayListModalProps {
    open: boolean;
    onClose: () => void;
}
export default function CreateNewPlayListModal(props: CreateNewPlayListModalProps) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 2,
                }}>
                    <Stack direction={'row'} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
                            Add New Playlist
                        </Typography>

                        <IconButton onClick={props.onClose}>
                            <CloseOutlinedIcon />
                        </IconButton>

                    </Stack>
                    {/* Playlist name */}
                    <TextField
                        size="small"
                        label="Playlist Name"
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "1px solid lightgray",
                                },
                                "&:hover fieldset": {
                                    border: "1px solid black",
                                },
                                "&.Mui-focused fieldset": {
                                    border: "2px solid black",
                                },
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                sx: {
                                    color: "gray",
                                    "&.Mui-focused": {
                                        color: "black",
                                    },
                                }
                            },
                        }}
                    />
                    <Typography fontWeight={'bold'} mt={2}>Playlist Image</Typography>
                    {/* Playlist Image */}
                    <Box sx={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '10px',
                        border: '1px solid lightgray',
                        mt: 2,
                    }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src="/images/video-image.jpg"
                                alt="Image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: '100%',
                            height: '50px',
                            backgroundColor: '#EA284E',
                            color: 'white',
                            borderRadius: '10px',
                            textTransform: 'none',
                        }}
                    >
                        <Typography variant="h6" fontWeight={'bold'}>Create</Typography>
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}
