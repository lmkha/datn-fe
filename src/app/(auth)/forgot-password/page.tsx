'use client';

import { Box, Button, CircularProgress, Grid2, IconButton, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stepper from '@/core/components/stepper';
import { useEffect, useState } from "react";
import { isValidEmail } from "@/core/logic/validate";
import { useAppContext } from "@/contexts/app-context";
import { resetPassword, verifyResetPassword } from "@/services/real/auth";

interface State {
    activeStep?: number;
    success?: boolean;
    disabled?: boolean;
    isSubmitting?: boolean;
    email?: string;
}
export default function ChangePasswordPage() {
    const [state, setState] = useState<State>();
    const { showAlert } = useAppContext();

    const handleSendOTP = async (email: string) => {
        const result = await resetPassword({ email });
        if (result.success) {
            setState({
                ...state,
                activeStep: 2,
                email: email,
            });
            showAlert(result.message, 'success');
        } else {
            showAlert(result.message, 'error');
        }
    };

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
                    Reset Password
                </Typography>
                <Grid2 container sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50px',
                }}>
                    <Grid2 size={3}>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'end',
                        }}>
                            {state?.activeStep === 2 && (<IconButton
                                onClick={() => setState({ ...state, activeStep: 1 })}
                                sx={{
                                    color: '#FE2C55',
                                }}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>)}
                        </Box>
                    </Grid2>
                    <Grid2 size={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <Stepper activeStep={state?.activeStep || 1} />
                        </Box>
                    </Grid2>
                    <Grid2 size={3}>

                    </Grid2>
                </Grid2>
                {state?.activeStep === 2 ?
                    (<EnterNewPasswordStep email={state?.email} />) :
                    (<SendOTPStepComponent
                        onSendOTP={handleSendOTP}
                    />)
                }

            </Stack>
        </Box>
    );
}

interface SendOTPStepProps {
    onSendOTP: (email: string) => void;

}
function SendOTPStepComponent(props: SendOTPStepProps) {
    interface State {
        email?: string;
        error?: string;
    }
    const [state, setState] = useState<State>();

    const handleSendOTP = async () => {
        if (!state?.email) return;
        const error = await isValidEmail(state.email);
        if (error) {
            setState({ ...state, error });
            return;
        }
        props.onSendOTP(state.email);
    };

    return (
        <Stack
            direction={'row'}
            spacing={2}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TextField
                placeholder="Enter your email"
                value={state?.email}
                error={!!state?.error}
                helperText={state?.error}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                size="small"
                sx={{
                    width: '50%',
                    marginTop: 2,
                    backgroundColor: 'white',
                }}
            />
            <Button
                onClick={handleSendOTP}
                sx={{
                    textTransform: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FE2C55',
                    color: 'white',
                }}
            >
                Send OTP
            </Button>
        </Stack>
    );
}

interface EnterNewPasswordStepProps {
    email?: string;
}
function EnterNewPasswordStep(props: EnterNewPasswordStepProps) {
    interface State {
        email?: string;
        otpCode?: string;
        newPassword?: string;
        confirmPassword?: string;
        isSubmitting?: boolean;
        success?: boolean;
    }

    const [state, setState] = useState<State>();

    const { showAlert } = useAppContext();

    const handleSendAgain = async () => {
        if (!state?.email) return;
        const result = await resetPassword({ email: state.email });
        if (result.success) {
            showAlert(result.message, 'success');
        } else {
            showAlert(result.message, 'error');
        }
    };

    useEffect(() => {
        if (props?.email) {
            setState({ ...state, email: props.email });
        }
    }, [props?.email]);

    const handleResetPassword = async () => {
        console.log(state);
        if (!state?.newPassword || !state?.confirmPassword || !state?.email || !state?.otpCode) return;
        setState({ ...state, isSubmitting: true });
        const result = await verifyResetPassword({
            otpCode: state.otpCode,
            user: {
                email: state.email,
                password: state.newPassword,
                username: 'lmkha',
            }
        });

        if (result.success) {
            setState({ ...state, isSubmitting: false, success: true });
            showAlert(result.message, 'success');
        } else {
            setState({ ...state, isSubmitting: false, success: false });
            showAlert(result.message, 'error');
        }
    };

    return (
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
                label="New Password"
                size="small"
                value={state?.newPassword}
                onChange={(e) => setState({ ...state, newPassword: e.target.value })}
                sx={{
                    width: '50%',
                    marginTop: 2,
                    backgroundColor: 'white',
                }}
            />
            <TextField
                label="Confirm Password"
                size="small"
                value={state?.confirmPassword}
                onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
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
                    value={state?.otpCode}
                    onChange={(e) => setState({ ...state, otpCode: e.target.value })}
                    sx={{
                        width: '50%',
                        marginTop: 2,
                        backgroundColor: 'white',
                    }}
                />
                <Button
                    onClick={handleSendAgain}
                    sx={{
                        textTransform: 'none',
                        color: '#FE2C55',
                    }}>
                    Send again
                </Button>
            </Stack>
            <Button
                disabled={state?.isSubmitting || state?.success}
                onClick={handleResetPassword}
                variant="contained"
                sx={{
                    width: '50%',
                    backgroundColor: '#FE2C55',
                    color: 'white',
                    height: 40,
                }}
            >
                {state?.isSubmitting ?
                    <CircularProgress size={20} color="inherit" /> :
                    'Reset Password'
                }
            </Button>
        </Stack>
    );
}
