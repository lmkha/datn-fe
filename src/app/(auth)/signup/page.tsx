'use client';

import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Grid2, CircularProgress } from '@mui/material';
import { SignUpPageErrorField, validateSignUpForm } from '@/validators/signup-validator';
import { createAccount } from '@/services/real/auth';
import Password from '../login/components/password';
import VerifyAccountModal from '../verify-modal';
import { useRouter } from 'next/navigation';

export interface SignUpPageState {
    fullName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    isLoading?: boolean;
    errors?: SignUpPageErrorField[];
    submitMessage?: string;
    success?: boolean;
    showPassword?: boolean;
    showConfirmPassword?: boolean;
    openVerifyModal?: boolean;
}

export default function SignUpPage() {
    const router = useRouter();
    const [state, setState] = useState<SignUpPageState>({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        openVerifyModal: false,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        setState({ ...state, isLoading: true });
        event.preventDefault();

        const validateResult = await validateSignUpForm(state);
        if (validateResult.length > 0) {
            setState({ ...state, isLoading: false, errors: validateResult });
            return;
        }
        // Call API to create new account
        await createAccount({
            fullName: state.fullName,
            email: state.email,
            username: state.username,
            password: state.password,
        }).then((data) => {
            if (data.success) {
                setState({
                    ...state,
                    isLoading: false,
                    submitMessage: 'Account created successfully, check your email to verify your account.',
                    success: true,
                    openVerifyModal: true,
                });
            } else {
                setState({
                    ...state,
                    isLoading: false,
                    submitMessage: data.message,
                    success: false
                });
            }
        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #EA284E, #F5A7C5, #FF6F61)',
            }}
        >
            <Grid2
                container
                sx={{
                    backgroundColor: 'white',
                    height: '95%',
                    width: '40%',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                }}
            >
                {/* Branding Header */}
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#EA284E', marginBottom: 1 }}>
                    MeTube
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 400, color: 'gray', marginBottom: 2 }}>
                    Create a new account
                </Typography>

                {/* SignUp Form Section */}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        sx={{
                            width: '100%',
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
                        value={state.fullName}
                        onChange={(e) => setState({ ...state, fullName: e.target.value })}
                        error={state.errors?.find((e) => e.field === 'fullName') !== undefined}
                        helperText={state.errors?.find((e) => e.field === 'fullName')?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        sx={{
                            width: '100%',
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
                        error={state.errors?.find((e) => e.field === 'email') !== undefined}
                        helperText={state.errors?.find((e) => e.field === 'email')?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={state.username}
                        onChange={(e) => setState({ ...state, username: e.target.value })}
                        sx={{
                            width: '100%',
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
                        error={state.errors?.find((e) => e.field === 'username') !== undefined}
                        helperText={state.errors?.find((e) => e.field === 'username')?.message}
                    />
                    <Box paddingTop={2}>
                        <Password
                            showPassword={state?.showPassword || false}
                            isError={state.errors?.find((e) => e.field === 'password') !== undefined}
                            helperText={state.errors?.find((e) => e.field === 'password')?.message}
                            onChange={(value) => { setState({ ...state, password: value }) }}
                            onChangeShowPassword={() => setState({ ...state, showPassword: !state.showPassword })}
                            validatePassword={() => { }}
                        />
                    </Box>
                    <Box paddingTop={3}>
                        <Password
                            label="Confirm Password"
                            showPassword={state?.showConfirmPassword || false}
                            isError={state.errors?.find((e) => e.field === 'confirmPassword') !== undefined}
                            helperText={state.errors?.find((e) => e.field === 'confirmPassword')?.message}
                            onChange={(value) => { setState({ ...state, confirmPassword: value }) }}
                            onChangeShowPassword={() => setState({ ...state, showConfirmPassword: !state.showConfirmPassword })}
                            validatePassword={() => { }}
                        />
                    </Box>
                    <Button
                        disabled={state?.isLoading || state?.success}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            height: 50,
                            backgroundColor: '#EA284E',
                            textTransform: 'none',
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        {state?.isLoading ? (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        ) : (
                            <Typography sx={{ color: 'white' }}>
                                Sign Up
                            </Typography>
                        )}
                    </Button>
                </Box>

                {/* Submit message */}
                {state.submitMessage && (
                    <Typography variant="body1" fontWeight={'bold'} sx={{ color: state.success ? 'green' : 'red', marginBottom: 1 }}>
                        {state.submitMessage}
                    </Typography>
                )}

                <Grid2 container justifyContent="flex-end" alignItems="center">
                    <Typography variant="body2" sx={{ mr: 1 }}>
                        Already have an account?
                    </Typography>
                    <Button
                        href="/login"
                        variant="text"
                        sx={{
                            padding: 0, textTransform: 'none', color: '#EA284E'
                        }}>
                        Sign In
                    </Button>
                </Grid2>
            </Grid2>
            <VerifyAccountModal
                open={state?.openVerifyModal || false}
                username={state.username}
                onSuccess={() => {
                    setState({ ...state, openVerifyModal: false });
                    router.push('/login');
                }}
            />
        </Box>
    );
}
