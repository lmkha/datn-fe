'use client';

import { Box, Button, Grid2, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import CreateNewPlayListModal from "./create-playlist-modal";


export default function PlayListSelect() {
    const [playlist, setPlaylist] = React.useState('');
    const [openCreateNewPlaylistModal, setOpenCreateNewPlaylistModal] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setPlaylist(event.target.value);
    };

    return (
        <Box>
            <Typography fontWeight="bold" mb={1}>
                Select Playlist
            </Typography>
            <Grid2 container spacing={1} direction={'row'} sx={{
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                <Grid2 size={9}>
                    <FormControl fullWidth>
                        <Select
                            size="small"
                            value={playlist}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select a playlist' }}
                        >
                            <MenuItem value="" disabled>
                                Choose a playlist
                            </MenuItem>
                            <MenuItem value="1">My Favorites</MenuItem>
                            <MenuItem value="2">Workout Mix</MenuItem>
                            <MenuItem value="3">Relaxing Music</MenuItem>
                            <MenuItem value="4">Top Hits</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3} height={'100%'} sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            width: 'auto',
                            height: '100%',
                        }}
                        onClick={() => setOpenCreateNewPlaylistModal(true)}
                    >
                        <Typography>Create</Typography>
                    </Button>
                </Grid2>
            </Grid2>
            <CreateNewPlayListModal
                open={openCreateNewPlaylistModal}
                onClose={() => setOpenCreateNewPlaylistModal(false)}
            />
        </Box>
    );
}
