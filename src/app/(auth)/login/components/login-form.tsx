'use client';

import { Button, TextField, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import Password from './password';
import { useState } from 'react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {/* Add Icon Here */}

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Welcome to MeTube</Typography>
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
            }} />

            <Password
                showPassword={showPassword}
                isError={false}
                helperText=''
                onChange={() => { }}
                validatePassword={() => { }}
                onChangeShowPassword={() => setShowPassword(!showPassword)}
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
            }}>Sign In</Button>

            <Button startIcon={<GoogleIcon />} variant="outlined" fullWidth sx={{
                textTransform: 'none',
                borderColor: '#EA284E',
                color: '#EA284E',
            }}>
                Sign In with Google
            </Button>

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
        </Box>
    );
};
