'use client';

import { Button, TextField, Typography, Checkbox, FormControlLabel, Box, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import Password from './password';
import { useState } from 'react';
import { login } from '@/services/real/auth';
import { useRouter } from 'next/navigation';
import VerifyAccountModal from '../../verify-modal';
import { LoginFormErrorField, validateLoginForm } from '@/validators/login-validator';

export interface LoginFormState {
    username: string;
    password: string;
    showPassword: boolean;
    openVerifyModal: boolean;
    isProcessing: boolean;
    errors?: LoginFormErrorField[],

}
export default function LoginForm() {
    const router = useRouter();
    const [state, setState] = useState<LoginFormState>({
        username: '',
        password: '',
        showPassword: false,
        openVerifyModal: false,
        isProcessing: false,
    });


    const handleSubmit = async () => {
        setState({ ...state, isProcessing: true })
        const validateResult = await validateLoginForm(state);
        if (validateResult.length > 0) {
            setState({ ...state, isProcessing: false, errors: validateResult });
            return;
        }
        await login({ username: state.username, password: state.password }).then((result) => {
            if (result.success) {
                router.push('/');
                setState({
                    ...state,
                    isProcessing: false,
                    errors: [],
                });
            } else {
                if (result.message === 'Verifying you account, please check you email inbox!') {
                    setState({ ...state, isProcessing: false, openVerifyModal: true });
                    return;
                }

                if (result.message === 'The username does not exist') {
                    setState({ ...state, isProcessing: false, errors: [{ field: 'username', message: result.message }] });
                    return;
                }

                if (result.message === 'Invalid password') {
                    setState({ ...state, isProcessing: false, errors: [{ field: 'password', message: result.message }] });
                    return;

                }
            }
        });
    };

    // ReLogin to get access token and user data after verify account
    const handleReLoginAfterVerify = async () => {
        login({ username: state.username, password: state.password }).then((result) => {
            if (result.success) {
                router.push('/');
                setState({
                    ...state,
                    isProcessing: false,
                    errors: [],
                });
            }
        });
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {/* Add Icon Here */}

            <Stack direction={'row'} spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Welcome to</Typography>
                <Typography
                    onClick={() => router.push('/')}
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        ":hover": {
                            color: '#EA284E',
                            cursor: 'pointer',
                        }
                    }}
                >
                    MeTube
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Enter your email and password to access your account
            </Typography>

            <TextField label="Username" variant="outlined" fullWidth sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black',
                },
            }}
                error={state.errors?.find((error) => error.field === 'username') ? true : false}
                helperText={state.errors?.find((error) => error.field === 'username')?.message}
                onChange={(e) => setState({ ...state, username: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <Password
                showPassword={state.showPassword}
                isError={state.errors?.find((error) => error.field === 'password') ? true : false}
                helperText={state.errors?.find((error) => error.field === 'password')?.message}
                onChange={(value) => setState({ ...state, password: value })}
                validatePassword={() => { }}
                onChangeShowPassword={() => setState({ ...state, showPassword: !state.showPassword })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ alignSelf: 'flex-start' }}
            />
            <Button variant="contained" fullWidth sx={{
                mt: 2, mb: 2,
                textTransform: 'none',
                backgroundColor: '#EA284E',
            }}
                onClick={() => handleSubmit()}
            >Sign In</Button>

            <Button startIcon={<GoogleIcon />} variant="outlined" fullWidth sx={{
                textTransform: 'none',
                borderColor: '#EA284E',
                color: '#EA284E',
            }}>
                Sign In with Google
            </Button>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
            }}>
                <Typography variant="body2" align="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Link href="/forgot-password">
                            <Typography variant="body2" sx={{
                                color: '#EA284E',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Box>
                </Typography>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    Don’t have an account?&nbsp;
                    <Link href="/signup">
                        <Typography variant="body2" sx={{
                            color: '#EA284E',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            '&:hover': { textDecoration: 'underline' }
                        }}>
                            Sign up
                        </Typography>
                    </Link>
                </Box>
            </Typography>



            <VerifyAccountModal
                open={state.openVerifyModal}
                username={state.username || ''}
                onSuccess={() => {
                    setState({ ...state, openVerifyModal: false });
                    handleReLoginAfterVerify();
                }}
            />
        </Box>
    );
};
