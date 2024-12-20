import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SxProps, Theme } from '@mui/material';

interface PasswordProps {
    showPassword: boolean;
    onChange: (value: string) => void;
    validatePassword: (password: string) => void;
    onChangeShowPassword: () => void;
    isError?: boolean;
    helperText?: string;
    label?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Password(
    {
        label = 'Password',
        showPassword,
        isError = false,
        helperText = '',
        onChange,
        validatePassword,
        onChangeShowPassword,
        onKeyDown,
    }: PasswordProps
) {
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <FormControl variant="outlined" error={isError} sx={{
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
            }}>
                <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        validatePassword(e.target.value);
                        onChange(e.target.value);
                    }}
                    onKeyDown={(e) => onKeyDown && onKeyDown(e as React.KeyboardEvent<HTMLInputElement>)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={onChangeShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {isError && <FormHelperText error>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
}
