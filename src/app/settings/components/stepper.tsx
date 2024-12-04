'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function Stepper({ activeStep }: { activeStep: number }) {
    return (
        <Box sx={{ width: '50%' }}>
            <Grid2 container spacing={2} width={'100%'} sx={{
                alignItems: 'center',
            }}>
                <Grid2 size={4} alignContent={'end'} justifyContent={'end'}>
                    {/* Stepper 1 */}
                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                color: activeStep === 1 ? 'white' : '#FE2C55',
                                backgroundColor: activeStep === 1 ? '#FE2C55' : 'white',
                                border: '1px solid #FE2C55',
                                borderRadius: '50%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: 'all 0.4s ease-in-out',
                            }}
                        >
                            {activeStep === 1 ? (
                                1
                            ) : (
                                <CheckIcon sx={{ transition: 'opacity 0.4s ease-in-out', opacity: activeStep === 1 ? 0 : 1 }} />
                            )}
                        </Box>

                        <Typography>Verify</Typography>
                    </Stack>
                </Grid2>
                <Grid2 size={4}>
                    <Divider
                        sx={{
                            width: '100%',
                            height: '3px',
                            backgroundColor: activeStep === 2 ? '#FE2C55' : 'lightgrey',
                            borderRadius: '3px',
                            transition: 'background-color 0.5s ease-in-out',
                            '&::before': {
                                height: '3px',
                                width: activeStep === 1 ? '100%' : '0%',
                                backgroundColor: '#1890FF',
                                transition: 'width 0.5s ease-in-out',
                            }
                        }}
                    />

                </Grid2>
                <Grid2 size={4}>
                    {/* Stepper 2 */}
                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                color: activeStep === 2 ? 'white' : 'gray',
                                backgroundColor: activeStep === 2 ? '#FE2C55' : 'white',
                                border: activeStep === 2 ? '1px solid #FE2C55' : '1px solid gray',
                                borderRadius: '50%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: 'all 0.4s ease-in-out',
                            }}
                        >
                            2
                        </Box>

                        <Typography>Change Password</Typography>
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
}
