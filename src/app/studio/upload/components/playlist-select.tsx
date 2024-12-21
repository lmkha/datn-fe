'use client';

import { Box, Button, Grid2, Typography } from "@mui/material";
import * as React from 'react';
import CreateNewPlayListModal from "./create-playlist-modal";
import { get } from "@/hooks/use-local-storage";
import { getAllPlaylistByUserId } from "@/services/real/playlist";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


interface State {
    allPlaylists?: any[];
    selectedPlaylist?: any;
    openCreateNewPlaylistModal?: boolean;
    searchValue?: string;
}
interface PlayListSelectProps {
    onSelected?: (playlistId: string) => void;
}
export default function PlayListSelect(props: PlayListSelectProps) {
    const user = get<any>('user');
    const [state, setState] = React.useState<State>();

    const fetchData = async () => {
        if (!user?.id) return;
        getAllPlaylistByUserId(user.id).then((response) => {
            if (response.success && response.data) {
                setState({ ...state, allPlaylists: response.data });
            }
        });
    };

    React.useEffect(() => {
        fetchData();
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
                    <Autocomplete
                        size="small"
                        options={
                            state?.allPlaylists
                                ?.filter((playlist) =>
                                    playlist.name.toLowerCase().includes(state?.searchValue?.toLowerCase() || '')
                                )
                                .map((playlist) => ({ id: playlist.id, name: playlist.name })) || []
                        }
                        onChange={(event, newValue) => {
                            setState({ ...state, selectedPlaylist: newValue });
                            props.onSelected && props.onSelected(newValue?.id || '');
                        }}
                        inputValue={state?.searchValue || ''}
                        onInputChange={(event, newInputValue) => {
                            setState({ ...state, searchValue: newInputValue });
                        }}
                        getOptionLabel={(option) => option.name || ''}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        noOptionsText="No playlists available"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select or search a playlist"
                                aria-label="Select a playlist"
                            />
                        )}
                        sx={{ width: '100%' }}
                    />

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
                open={state?.openCreateNewPlaylistModal || false}
                onClose={() => setState({ ...state, openCreateNewPlaylistModal: false })}
                onCreated={() => {
                    fetchData();
                }}
            />
        </Box>
    );
}
