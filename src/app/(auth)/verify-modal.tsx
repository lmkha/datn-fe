'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Grid2 } from '@mui/material';
import { verifyAccount } from '@/services/real/auth';
import { useRouter } from 'next/navigation';

interface ModalProps {
    open: boolean;
    username: string;
}

interface VerifyAccountModalState {
    code: string[];
    isSubmitting?: boolean;
    success?: boolean;
    message?: string;
}

export default function VerifyAccountModal(props: ModalProps) {
    const router = useRouter();
    const [state, setState] = useState<VerifyAccountModalState>({ code: Array(6).fill('') });

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const updatedCode = [...state.code];
            updatedCode[index] = value;
            setState({ ...state, code: updatedCode });

            if (value && index < state.code.length - 1) {
                const nextInput = document.getElementById(`code-input-${index + 1}`);
                if (nextInput) {
                    (nextInput as HTMLInputElement).focus();
                    (nextInput as HTMLInputElement).select();
                }
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' && !state.code[index] && index > 0) {
            const updatedCode = [...state.code];
            updatedCode[index - 1] = '';
            setState({ ...state, code: updatedCode });

            const prevInput = document.getElementById(`code-input-${index - 1}`);
            if (prevInput) {
                (prevInput as HTMLInputElement).focus();
                (prevInput as HTMLInputElement).select();
            }
        } else if (event.key === 'ArrowRight' && index < state.code.length - 1) {
            const nextInput = document.getElementById(`code-input-${index + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
                setTimeout(() => {
                    (nextInput as HTMLInputElement).select();
                }, 0);
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            const prevInput = document.getElementById(`code-input-${index - 1}`);
            if (prevInput) {
                (prevInput as HTMLInputElement).focus();
                setTimeout(() => {
                    (prevInput as HTMLInputElement).select();
                }, 0);
            }
        }
    };

    const handleFocus = (index: number) => {
        const input = document.getElementById(`code-input-${index}`);
        if (input) {
            (input as HTMLInputElement).select();
        }
    };

    const handleSubmit = async () => {
        setState({ ...state, isSubmitting: true });
        verifyAccount({ username: props.username, otpCode: state.code.join('') }).then((data) => {
            if (data.success) {
                setState({ ...state, isSubmitting: false, success: true, message: 'Verification successful!' });
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
                setState({ ...state, isSubmitting: false, success: false, message: data.message });
            }
        });
    };

    const handleSendAgain = () => {

    };

    return (
        <Modal
            open={props.open}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: '10px',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                textAlign: 'center',
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Verify Account
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1, color: 'gray' }}>
                    Enter the 6-digit code sent to your email.
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                    mt: 2,
                }}>
                    {state.code.map((value, index) => (
                        <TextField
                            key={index}
                            id={`code-input-${index}`}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={() => handleFocus(index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: '20px', padding: '10px' },
                            }}
                            sx={{
                                width: 40,
                                height: 40,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    ))}
                </Box>
                <Box sx={{ height: 20, p: 2 }}>
                    <Typography id="modal-modal-description" fontWeight={'bold'} sx={{ color: state.success ? 'green' : 'red' }}>
                        {state?.message || ''}
                    </Typography>
                </Box>

                <Grid2 container direction={'row'} sx={{
                    justifyContent: 'center',
                    alignItems: 'end',
                }}>
                    <Grid2 size={4} />
                    <Grid2 size={4}>
                        <Button
                            onClick={handleSubmit}
                            disabled={state.code.some((value) => !value)}
                            variant="contained"
                            sx={{
                                mt: 2, textTransform: 'none',
                                backgroundColor: '#EA284E',
                                width: '100%',

                            }}>
                            {state?.isSubmitting ? (
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
                                    Verify
                                </Typography>
                            )}
                        </Button>
                    </Grid2>
                    <Grid2 size={4}>
                        <Box sx={{
                            justifyContent: 'flex-end',
                        }}>
                            <Button
                                onClick={handleSendAgain}
                                variant='text'
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: 'transparent',
                                }}>
                                <Typography id="modal-modal-description" sx={{ mt: 1, color: 'gray' }}>
                                    Send again
                                </Typography>

                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>

            </Box>
        </Modal>
    );
}
