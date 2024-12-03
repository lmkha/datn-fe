'use client';

import { Box, Button, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/legacy/image";
import { createPlaylist } from "@/services/real/playlist";

interface CreateNewPlayListModalState {
    title?: string;
    imageSrc?: string;
    isUploading?: boolean;
    created?: boolean;
}
interface CreateNewPlayListModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}
export default function CreateNewPlayListModal(props: CreateNewPlayListModalProps) {
    const [state, setState] = React.useState<CreateNewPlayListModalState>();
    const playlistImageFile = React.useRef<File | null>(null);

    const handleClose = () => {
        setState({});
        playlistImageFile.current = null;
        props.onClose();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(file);

            playlistImageFile.current = file;

            setState({
                ...state,
                imageSrc: imageURL,
            });
        }
    };

    const handleCreatePlaylist = async () => {
        setState({ ...state, isUploading: true });

        createPlaylist({
            name: state?.title || 'Playlist Name',
            description: '',
            thumbnailFile: playlistImageFile.current,
        }).then((response) => {
            if (response.success) {
                setState({ ...state, isUploading: false, created: true });
                props.onCreated?.();
            } else {
                setState({ ...state, isUploading: false });
            }
        });

    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={handleClose}
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
                            onChange={(event) => setState({ ...state, title: event.target.value })}
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
                        {/* Playlist Image(Click to change Image) */}
                        <Box
                            onClick={() => document.getElementById("playlistInput")?.click()}
                            sx={{
                                cursor: "pointer",
                                width: '100%',
                                height: '200px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundColor: 'black',
                            }}
                        >
                            {/* Playlist Image */}
                            <Image
                                src={state?.imageSrc || ''}
                                alt="Playlist Image"
                                layout="fill"
                                objectFit="cover"
                            />

                            {/* Overlay */}
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                width="100%"
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bgcolor="rgba(0, 0, 0, 0.6)"
                                color="white"
                                sx={{
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    ":hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Typography variant="h6">{state?.imageSrc ? "Change Image" : "Choose Image"}</Typography>
                            </Box>

                            <input
                                hidden
                                id="playlistInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Box>

                        {/* Create Button */}
                        <Button
                            onClick={handleCreatePlaylist}
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
                            {state?.isUploading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'white',
                                    }}
                                />
                            ) : (
                                <Typography variant="h6" fontWeight={'bold'}>
                                    {state?.created ? 'Created' : 'Create'}
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
