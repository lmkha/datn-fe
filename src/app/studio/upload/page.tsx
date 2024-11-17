'use client';

import { useStudioContext } from "@/contexts/studio-context";
import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function UploadVideoPage() {
    const { state, dispatch } = useStudioContext();
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'Upload' });
    }, []);

    return (
        <>
            <Stack spacing={2} sx={{
                paddingTop: 1,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#F8F8F8',
            }}>
                <Paper elevation={0} sx={{
                    mt: 1,
                    width: '80%',
                    height: '200px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    borderBottom: '5px solid #00C39B',
                }}>
                    <Grid2 container direction={'row'} spacing={1} sx={{
                        width: '100%',
                        height: '100%',
                        padding: 1
                    }}>
                        <Grid2 size={8} sx={{
                            height: '100%',
                            backgroundColor: 'yellow',
                            borderRadius: '10px',
                        }}>
                            <Typography>Video file meta data</Typography>
                        </Grid2>

                        <Grid2 size={4} sx={{
                            height: '100%',
                            backgroundColor: 'black',
                            borderRadius: '10px',
                        }}>
                            <Typography>Small video player</Typography>
                        </Grid2>
                    </Grid2>
                </Paper>

                <Paper elevation={0} sx={{
                    width: '80%',
                    height: '100px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                }}>
                    <Typography>Post' title, HashTag</Typography>
                </Paper>
            </Stack>
        </>
    );
}
