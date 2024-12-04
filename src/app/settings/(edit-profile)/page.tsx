'use client';

import { Avatar, Box, Button, Grid2, Stack, Switch, TextField, Typography } from "@mui/material";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { get } from "@/hooks/use-local-storage";

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
}
export default function EditProfilePage() {
    const user = get('user');
    const [state, setState] = React.useState<PageState>({
        avatar: user?.profilePic,
        fullName: user?.fullName,
        username: user?.username,
        bio: user?.bio,
        dateOfBirth: dayjs(user?.dateOfBirth),
        phone: user?.phone,
        isPrivate: user?.isPrivate,
    });

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
                        {/* username */}
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Username"
                                value={state.username}
                                onChange={(e) => setState({ ...state, username: e.target.value })}
                                sx={{
                                    width: '60%',
                                }}
                                slotProps={{
                                    input: {
                                        sx: {
                                            backgroundColor: 'white',
                                        }
                                    },
                                    inputLabel: {
                                        shrink: Boolean(state.username),
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
                                Usernames must be between 3 and 30 characters long and can only include letters, numbers, underscores, and periods. They cannot begin or end with underscores or periods, and consecutive underscores or periods are not allowed. Changing your username will also update your profile link.
                            </Typography>

                        </Stack>
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
                        {/* Save button */}
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Button variant="contained" sx={{
                                textTransform: 'none',
                                backgroundColor: '#EA284E',
                                color: 'white',
                                width: '60%',
                                height: 50,
                            }}>
                                <Typography variant={'h6'}>Save</Typography>
                            </Button>
                        </Box>
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
}

interface AvatarComponentProps {
    onAvatarFileChange: (file: File) => void;
}
function AvatarComponent(props: AvatarComponentProps) {
    const [avatarSrc, setAvatarSrc] = React.useState("/images/avatar.jpg");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setAvatarSrc(imageURL);
            props.onAvatarFileChange(file);
        }
    };

    return (
        <Box
            position="relative"
            width={300}
            height={300}
            onClick={() => document.getElementById("avatarInput")?.click()}
            sx={{ cursor: "pointer" }}
        >
            {/* Avatar */}
            <Avatar
                src={avatarSrc}
                alt="avatar"
                sx={{
                    width: 300,
                    height: 300,
                }}
            />

            {/* Overlay */}
            <Box
                borderRadius={50}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.6)"
                color="white"
                sx={{
                    opacity: 0,
                    transition: "opacity 0.3s",
                    ":hover": {
                        opacity: 1,
                    },
                }}
            >
                <Typography variant="h6">Change Avatar</Typography>
            </Box>

            <input
                hidden
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </Box>
    );
}
