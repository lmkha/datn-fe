'use client';

import { Button, TextField, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import Password from './password';
import { useState } from 'react';
import { login } from '@/services/real/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = () => {
        username && password && login({
            username: username,
            password: password
        }).then((result) => {
            if (result.success) {
                router.push('/');
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
            }}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Password
                showPassword={showPassword}
                isError={false}
                helperText=''
                onChange={(value) => { setPassword(value) }}
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
            }}
                onClick={() => handleLogin()}
            >Sign In</Button>

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
