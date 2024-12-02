'use client';

import { Box, Button, Grid2, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import CreateNewPlayListModal from "./create-playlist-modal";
import { get } from "@/hooks/use-local-storage";
import { getAllPlaylistByUserId } from "@/services/real/playlist";
import { useUserContext } from "@/contexts/user-context";

interface Playlist {
    id: string;
    name: string;
}
interface PlayListSelectState {
    allPlaylists: Playlist[];
    selectedPlaylist?: Playlist;
    openCreateNewPlaylistModal?: boolean;
}
interface PlayListSelectProps {
    onPlaylistSelected?: (playlist: string) => void;
}
export default function PlayListSelect(props: PlayListSelectProps) {
    const { state: userState } = useUserContext();
    const [state, setState] = React.useState<PlayListSelectState>({ allPlaylists: [] });

    const fetchPlaylists = async () => {
        console.log('User stat id', userState.userId);
        if (!userState.userId) return;
        getAllPlaylistByUserId(userState.userId).then((response) => {
            if (response.success && response.data) {
                response.data.map((playlist: any) => {
                    setState({
                        ...state,
                        allPlaylists: [...state.allPlaylists, { id: playlist.id, name: playlist.name }]
                    });
                });
            }
        });
    };

    React.useEffect(() => {
        fetchPlaylists();
    }, []);

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
                            onChange={(event: SelectChangeEvent) => {

                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select a playlist' }}
                        >
                            <MenuItem value="" disabled>
                                Choose a playlist
                            </MenuItem>
                            {state?.allPlaylists?.map((playlist, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => props.onPlaylistSelected && props.onPlaylistSelected(playlist.id)}
                                >
                                    {playlist.name}
                                </MenuItem>
                            ))}
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
                        onClick={() => setState({ ...state, openCreateNewPlaylistModal: true })}
                    >
                        <Typography>Create</Typography>
                    </Button>
                </Grid2>
            </Grid2>
            <CreateNewPlayListModal
                open={state.openCreateNewPlaylistModal || false}
                onClose={() => setState({ ...state, openCreateNewPlaylistModal: false })}
                onCreated={() => {
                    fetchPlaylists();
                }}
            />
        </Box>
    );
}
