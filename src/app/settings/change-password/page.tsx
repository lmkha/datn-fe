'use client';

import { Box, Button, CircularProgress, Grid2, IconButton, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stepper from '@/core/components/stepper';
import { useState } from "react";
import { isValidEmail } from "@/core/logic/validate";
import { useAppContext } from "@/contexts/app-context";
import { login, logout, resetPassword, verifyResetPassword } from "@/services/real/auth";
import { ForgotPasswordErrorField, validateForgotPassword } from "@/validators/forgot-pw-validator";
import { get } from "@/hooks/use-local-storage";

interface State {
    activeStep?: number;
    success?: boolean;
    disabled?: boolean;
    isSubmitting?: boolean;
    email?: string;
}
export default function ResetPasswordPage() {
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
            showAlert({ message: result.message, severity: 'success' });
        } else {
            showAlert({ message: result.message, severity: 'error' });
        }
    };

    return (
        <Stack sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '100%',
                height: '90%',
                padding: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Stack spacing={3} sx={{
                    padding: 5,
                    width: '100%',
                    height: '100%',
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
                        <Grid2 size={3} />
                    </Grid2>
                    {state?.activeStep === 2 ?
                        (<EnterNewPasswordStep email={state?.email} />) :
                        (<SendOTPStepComponent onSendOTP={handleSendOTP} />)
                    }
                </Stack>
            </Box>
        </Stack>
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
                size="medium"
                sx={{
                    width: '50%',
                    marginTop: 2,
                    backgroundColor: 'white',
                }}
            />
            <Button
                onClick={handleSendOTP}
                sx={{
                    height: 40,
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
export interface EnterNewPasswordStepState {
    username?: string;
    otpCode?: string;
    newPassword?: string;
    confirmPassword?: string;
}
function EnterNewPasswordStep(props: EnterNewPasswordStepProps) {
    interface State extends EnterNewPasswordStepState {
        isSubmitting?: boolean;
        success?: boolean;
        errorFields?: ForgotPasswordErrorField[];
    }
    const [state, setState] = useState<State>();
    const { showAlert } = useAppContext();

    const handleSendAgain = async () => {
        if (!props?.email) return;
        const result = await resetPassword({ email: props.email });
        showAlert({ message: result.message, severity: result.success ? 'success' : 'error' });
    };

    const handleResetPassword = async () => {
        setState({ ...state, isSubmitting: true });

        const validateResult = await validateForgotPassword({
            email: props.email,
            newPassword: state?.newPassword,
            confirmPassword: state?.confirmPassword,
            otpCode: state?.otpCode
        });
        if (validateResult.length > 0) {
            setState({ ...state, isSubmitting: false, errorFields: validateResult });
            return;
        }
        if (!state?.newPassword || !state?.confirmPassword || !props?.email || !state?.otpCode) return;
        const result = await verifyResetPassword({
            otpCode: state.otpCode,
            user: {
                email: props.email,
                password: state.newPassword,
            }
        });

        showAlert({ message: result.message, severity: result.success ? 'success' : 'error' });
        if (result.success) {
            setState({ ...state, isSubmitting: false, success: true });
            const username = get<any>("user").username;
            const reLoginResult = await login({ username: username, password: state.newPassword });
            if (!reLoginResult.success) {
                showAlert({ message: reLoginResult.message, severity: 'error' });
                logout();
            }
        } else {
            setState({ ...state, isSubmitting: false, success: false });
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
                error={!!state?.errorFields?.find((field) => field.field === 'newPassword')}
                helperText={state?.errorFields?.find((field) => field.field === 'newPassword')?.message}
                onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
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
                error={!!state?.errorFields?.find((field) => field.field === 'confirmPassword')}
                helperText={state?.errorFields?.find((field) => field.field === 'confirmPassword')?.message}
                onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
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
                    error={!!state?.errorFields?.find((field) => field.field === 'otpCode')}
                    helperText={state?.errorFields?.find((field) => field.field === 'otpCode')?.message}
                    onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
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
