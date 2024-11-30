import { Avatar, Box, Button, Grid2, Stack, Switch, TextField, Typography } from "@mui/material";

// avatar, fullName, username, bio, date of birth,  phone, isPrivate
export default function EditProfilePage() {
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
                        <Avatar
                            src="/images/avatar.jpg"
                            alt="avatar"
                            sx={{
                                width: 300,
                                height: 300,
                            }}
                        />

                        {/* Is private */}
                        <Stack direction={'row'}>
                            <Typography variant={'h6'}>Set private</Typography>
                            <Switch />
                        </Stack>

                        <TextField
                            // onChange={(e) => setPageState({ ...pageState, description: e.target.value })}
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
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Username"
                                sx={{
                                    width: '60%',
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
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your profile link.
                            </Typography>

                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Full name"
                                sx={{
                                    width: '60%',
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
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your profile link.
                            </Typography>
                        </Stack>

                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Date of birth"
                                sx={{
                                    width: '60%',
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
                                    input: {
                                        sx: {
                                            backgroundColor: 'white',
                                        }
                                    }
                                }}
                            />
                            <Typography variant={'body2'}>Date of birth</Typography>
                        </Stack>

                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                label="Phone"
                                sx={{
                                    width: '60%',
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
                                    input: {
                                        sx: {
                                            backgroundColor: 'white',
                                        }
                                    }
                                }}
                            />
                            <Typography variant={'body2'}>Phone</Typography>
                        </Stack>

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
