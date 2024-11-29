'use client';

import {
    Avatar,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Popover,
    MenuItem,
    ListItemIcon,
    Grid2,
    Button,
    Popper,
    Paper,
    List,
    ListItem,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, MouseEvent, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AddIcon from '@mui/icons-material/Add';
import GamepadIcon from '@mui/icons-material/Gamepad';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/user-context";
import { logout } from "@/services/real/auth";
import { get, set } from "@/hooks/use-local-storage";

interface HeaderProps {
    title?: string;
    logo?: React.ReactNode;
    logoClickRoute?: string;
    onOpenDrawerChange?: () => void;
    onSearch?: (query: string) => void;
    onUpload?: () => void;
    onNotification?: () => void;
}

export default function Header(props: HeaderProps) {
    return (
        <>
            <Grid2 container sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                {/* Toggle drawer, Logo, Title */}
                <Grid2 size={2}>
                    <Stack direction={'row'} sx={{ pl: 1, justifyContent: 'start', alignItems: 'center' }}>
                        {props?.onOpenDrawerChange && (
                            <IconButton onClick={props.onOpenDrawerChange}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        {/* <Link href={`/${props.logoClickRoute}`}> */}
                        <Link href={`${props?.logoClickRoute || '/'}`}>
                            <Stack direction="row" paddingLeft={1}>
                                {props?.logo}
                                <Typography variant="body1" fontWeight={'bold'}>{props?.title}</Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </Grid2>

                {/* Search */}
                <Grid2 size={8} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                    {props?.onSearch && (
                        <Search />
                    )}
                </Grid2>

                {/* Upload button, Notification, Account */}
                <Grid2 size={2}>
                    <Stack direction="row" spacing={2} sx={{
                        justifyContent: 'end',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        {/* UploadButton */}
                        {props?.onUpload && (
                            <Button
                                onClick={props.onUpload}
                                variant="outlined"
                                startIcon={<AddIcon fontSize="large" />}
                                sx={{
                                    textTransform: 'none',
                                    width: 'auto',
                                    height: '40px',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    border: '2px solid black',
                                    ":hover": {
                                        backgroundColor: '#EA284E',
                                        color: 'white',
                                        borderColor: 'transparent',
                                    }
                                }}
                            >
                                Upload
                            </Button>
                        )}

                        {/* Notification */}
                        {props?.onNotification && (
                            <IconButton
                                sx={{
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            >
                                <CircleNotificationsIcon fontSize="large" />
                            </IconButton>
                        )}
                        <Account />
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
}

function Account() {
    const router = useRouter();
    const { state: userState } = useUserContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar alt="Avt" src="/images/avatar.jpg" />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                    <MenuItem onClick={() => {
                        userState?.username && router.push(`/@${userState.username}`);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Profile</Typography>
                    </MenuItem>

                    <MenuItem onClick={() => {
                        router.push('/studio');
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <GamepadIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Studio</Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Settings</Typography>
                    </MenuItem>

                    <MenuItem onClick={() => {
                        router.replace('/login');
                        logout();
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Logout</Typography>
                    </MenuItem>
                </div>
            </Popover>
        </>
    )
}

function Search() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>(() => get("searchQuery") || "");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        set("searchQuery", value);
        if (value.length > 0) {
            setAnchorEl(event.currentTarget);
            setOpen(true);
        }
    };

    useEffect(() => {
        const storedQuery = get("searchQuery") || "";
        setSearchQuery(storedQuery);
    }, []);

    return (
        <>
            <TextField
                size="small"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        router.push(`/result?q=${searchQuery}`);
                    }
                    setOpen(false);
                }}
                sx={{
                    width: '50%',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        '&:hover fieldset': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#EA284E',
                        },
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />

            {/* Popper below the search field */}
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ width: anchorEl?.offsetWidth }}>
                <Paper elevation={3} sx={{ borderRadius: 3 }}>
                    <List>
                        <ListItem>Search suggestion 1</ListItem>
                        <ListItem>Search suggestion 2</ListItem>
                        <ListItem>Search suggestion 3</ListItem>
                        <ListItem>Search suggestion 4</ListItem>
                        <ListItem>Search suggestion 5</ListItem>
                        <ListItem>Search suggestion 6</ListItem>
                        <ListItem>Search suggestion 7</ListItem>
                        <ListItem>Search suggestion 8</ListItem>
                        <ListItem>Search suggestion 9</ListItem>
                        <ListItem>Search suggestion 10</ListItem>
                    </List>
                </Paper>
            </Popper>
        </>
    );
}