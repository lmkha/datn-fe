'use client';

import { Box, Button, CircularProgress, Grid2, Stack, TextField, Typography } from "@mui/material";
import Stepper from "../components/stepper";
import { useState } from "react";

interface PageState {
    activeStep: number;
    success: boolean;
    sentVerification: boolean;
    disabled?: boolean;
    isSubmitting?: boolean;
}
export default function ChangePasswordPage() {
    const [state, setState] = useState<PageState>({
        activeStep: 1,
        success: false,
        sentVerification: false,
    });

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack spacing={3} sx={{
                padding: 5,
                width: '95%',
                height: '90%',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
            }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ textAlign: 'start' }}
                >
                    Change Password
                </Typography>
                {/* <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <Stepper activeStep={2} />
                </Box> */}

                <Stack
                    spacing={4}
                    sx={{
                        marginTop: 2,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        label="Old Password"
                        size="small"
                        sx={{
                            width: '50%',
                            marginTop: 2,
                            backgroundColor: 'white',
                        }}
                    />
                    <TextField
                        label="New Password"
                        size="small"
                        sx={{
                            width: '50%',
                            marginTop: 2,
                            backgroundColor: 'white',
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        size="small"
                        sx={{
                            width: '50%',
                            marginTop: 2,
                            backgroundColor: 'white',
                        }}
                    />
                    <Stack direction={'row'} spacing={2} width={'50%'} justifyContent={'space-between'}>
                        <TextField
                            label="OTP code"
                            size="small"
                            sx={{
                                width: '50%',
                                marginTop: 2,
                                backgroundColor: 'white',
                            }}
                        />
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: '#FE2C55',
                            }}>
                            Get OTP code in email
                        </Button>
                    </Stack>
                    <Button
                        disabled={state?.isSubmitting}
                        onClick={() => setState({ ...state, isSubmitting: true })}
                        variant="contained"
                        sx={{
                            width: '50%',
                            backgroundColor: '#FE2C55',
                            color: 'white',
                            height: 40,
                        }}
                    >
                        {
                            state?.isSubmitting ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                'Change Password'
                            )
                        }
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}