'use client';

import { Box, Button, CircularProgress, Grid2, Stack, Switch, TextField, Typography } from "@mui/material";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { get, set } from "@/hooks/use-local-storage";
import AvatarComponent from "./components/avatar";
import { getCurrentUser, updateProfile } from "@/services/real/user";

// avatar, fullName, username, bio, date of birth,  phone, isPrivate
interface PageState {
    avatar: string | null;
    fullName: string | null;
    username: string | null;
    bio: string | null;
    dateOfBirth: Dayjs | null;
    phone: string | null;
    isPrivate: boolean | null;
    newAvatarFile?: File;
    isDiscard?: boolean;
    success?: boolean;
    updating?: boolean;
}
export default function EditProfilePage() {
    const user = get<any>('user');
    const [state, setState] = React.useState<PageState>({
        avatar: user?.profilePic,
        fullName: user?.fullName,
        username: user?.username,
        bio: user?.bio,
        dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        phone: user?.phone,
        isPrivate: user?.isPrivate,
    });

    const handleSave = () => {
        const dateOfBirthToUnix = state.dateOfBirth?.unix() || 0;
        updateProfile({
            phone: state.phone || '',
            fullName: state.fullName || '',
            isPrivate: state.isPrivate || false,
            dateOfBirth: dateOfBirthToUnix.toString(),
            avatar: state.newAvatarFile || null,
        }).then((result) => {
            if (result.success) {
                setState({ ...state, success: true, updating: false });
                getCurrentUser().then((res) => {
                    if (res.success) {
                        set('user', res.data);
                    }
                });

            } else {
                setState({ ...state, success: false, updating: false });
            }
        });
    };

    const handleDiscard = () => {
        setState({
            avatar: user?.profilePic,
            fullName: user?.fullName,
            username: user?.username,
            bio: user?.bio,
            dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
            phone: user?.phone,
            isPrivate: user?.isPrivate,
            newAvatarFile: undefined,
            isDiscard: true,
        });
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Grid2 container direction={'row'} sx={{
                margin: 2,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                borderRadius: 5,
            }}>
                {/* Avatar, Privacy, Bio */}
                <Grid2 size={4} sx={{
                    padding: 2,
                }}>
                    <Stack spacing={2} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {/* Avatar */}
                        <AvatarComponent
                            onAvatarFileChange={(file) => setState({ ...state, newAvatarFile: file })}
                            oldAvatarSrc={user?.profilePic}
                            refresh={state.isDiscard || false}
                            onDoneRefresh={() => setState({ ...state, isDiscard: false })}
                        />

                        {/* Is private */}
                        <Stack direction={'row'}>
                            <Typography variant={'h6'}>Set private</Typography>
                            <Switch
                                checked={state.isPrivate || false}
                                onChange={(e) => setState({ ...state, isPrivate: e.target.checked })}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Stack>

                        <TextField
                            value={state.bio || ''}
                            onChange={(e) => setState({ ...state, bio: e.target.value })}
                            label='Bio'
                            placeholder="Write something about yourself"
                            multiline={true}
                            rows={5}
                            fullWidth={true}
                            variant="outlined"
                            sx={{
                                backgroundColor: 'white',
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "1px solid lightgray",
                                    },
                                    "&:hover fieldset": {
                                        border: "1px solid black",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "2px solid black",
                                    },
                                },
                            }}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        color: "gray",
                                        "&.Mui-focused": {
                                            color: "black",
                                        },
                                    }
                                },
                            }}
                        />
                    </Stack>
                </Grid2>
                {/* Username, FullName, Date of birth, Phone, Save Button */}
                <Grid2 size={8} sx={{
                    padding: 2,
                }}>
                    <Stack spacing={4}>
                        {/* FullName */}
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Full name"
                                value={state.fullName || ''}
                                onChange={(e) => setState({ ...state, fullName: e.target.value })}
                                sx={{
                                    width: '60%',
                                }}
                                slotProps={{
                                    input: {
                                        sx: {
                                            backgroundColor: 'white',
                                        }
                                    }
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal',
                                    width: '40%',
                                }}
                            >
                                Full names can include letters, spaces, and special characters like hyphens or apostrophes. They must be between 2 and 50 characters long. Consecutive spaces or special characters are not allowed, and names cannot start or end with spaces.
                            </Typography>
                        </Stack>
                        {/* Date of birth */}
                        <Stack direction={'row'} spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']} sx={{
                                    width: '60%',
                                }}>
                                    <DatePicker
                                        label="Date of birth"
                                        slotProps={{
                                            textField: {
                                                size: 'medium',
                                                sx: {
                                                    backgroundColor: 'white',
                                                    width: '100%',
                                                    color: "gray",
                                                    "&.Mui-focused": {
                                                        color: "black",
                                                    },
                                                }
                                            }
                                        }}
                                        value={state.dateOfBirth}
                                        onChange={(newValue) => setState({ ...state, dateOfBirth: newValue })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <Typography variant={'body2'}>Date of birth</Typography>
                        </Stack>
                        {/* Phone number */}
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Phone"
                                value={state.phone || ''}
                                onChange={(e) => setState({ ...state, phone: e.target.value })}
                                sx={{
                                    width: '60%',
                                }}
                                slotProps={{
                                    input: {
                                        sx: {
                                            backgroundColor: 'white',
                                        }
                                    }
                                }}
                            />
                            <Typography variant={'body2'}>Phone</Typography>
                        </Stack>
                        {/* Buttons */}
                        <Stack direction={"row"} sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            {/* Discard */}
                            <Box sx={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Button
                                    onClick={handleDiscard}
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        backgroundColor: 'gray',
                                        color: 'white',
                                        width: '60%',
                                        height: 50,
                                    }}>
                                    <Typography variant={'h6'}>Discard</Typography>
                                </Button>
                            </Box>

                            {/* Save */}
                            <Box sx={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Button
                                    disabled={state.success || state.updating || !state.fullName}
                                    onClick={handleSave}
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        backgroundColor: '#EA284E',
                                        color: 'white',
                                        width: '60%',
                                        height: 50,
                                    }}>
                                    {state.updating ? <CircularProgress size={24} color="inherit" /> :
                                        <Typography variant={'h6'}>
                                            {state.success ? 'Saved' : 'Save'}
                                        </Typography>
                                    }
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
}
