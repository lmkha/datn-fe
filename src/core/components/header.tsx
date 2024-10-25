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
    Box,
    Drawer,
    Popper,
    Paper,
    List,
    ListItem,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, MouseEvent } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onOpenDrawerChange?: () => void;
    onSearch?: (query: string) => void;
    onUpload?: () => void;
    onNotification?: () => void;
}

export default function Header({ onOpenDrawerChange: onOpenDrawer, onSearch, onUpload, onNotification }: HeaderProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <Grid2 container sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <Grid2 size={1}>
                    <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* <DrawerControl toggleDrawer={toggleDrawer} /> */}

                        {/* Use fixed drawer */}
                        <IconButton onClick={onOpenDrawer}>
                            <MenuIcon />
                        </IconButton>

                        <WebIcon />
                    </Stack>
                </Grid2>

                <Grid2 size={9} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                    <Search />
                </Grid2>

                <Grid2 size={2}>
                    <Stack direction="row" spacing={2} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <UploadButton />
                        <NotificationButton />
                        <Account />
                    </Stack>
                </Grid2>
            </Grid2>

            <DrawerContent anchor="left" open={drawerOpen} toggleDrawer={toggleDrawer} />
        </>
    );
}


interface DrawerContentProps {
    anchor: 'left' | 'right' | 'top' | 'bottom';
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
}

function DrawerContent({ anchor, open, toggleDrawer }: DrawerContentProps) {
    return (
        <Drawer
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(false)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
                {/* Thêm các mục menu ở đây */}
                <MenuItem component={Link} href="/">
                    Home
                </MenuItem>
                <MenuItem component={Link} href="/about">
                    About
                </MenuItem>
            </Box>
        </Drawer>
    );
}

function DrawerControl({ toggleDrawer }: { toggleDrawer: (open: boolean) => () => void }) {
    return (
        <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
        </IconButton>
    );
}

function WebIcon() {
    return (
        <Stack direction="row" paddingLeft={1}>
            <Link href={'/'}>MeTube</Link>
        </Stack>
    );
}

function NotificationButton() {
    return (
        <IconButton
            sx={{
                width: 'auto',
                height: 'auto',
            }}
        >
            <CircleNotificationsIcon fontSize="large" />
        </IconButton>
    );
}

function UploadButton() {
    return (
        <Button
            variant="outlined"
            startIcon={<AddIcon fontSize="large" />}
            sx={{
                textTransform: 'none',
                width: 'auto',
                height: '40px',
                fontWeight: 'bold',
                color: 'black',
                borderColor: 'black',
            }}
        >
            Upload
        </Button>
    );
}

function Account() {
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
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Settings</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
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

// function Search() {
//     return (
//         <TextField
//             size="small"
//             sx={{
//                 width: '50%',
//                 '& .MuiOutlinedInput-root': {
//                     borderRadius: 10,
//                     '&:hover fieldset': {
//                         borderColor: 'black',
//                     },
//                     '&.Mui-focused fieldset': {
//                         borderColor: '#EA284E',
//                     },
//                 },
//             }}
//             slotProps={{
//                 input: {
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton>
//                                 <SearchIcon />
//                             </IconButton>
//                         </InputAdornment>
//                     )
//                 }
//             }}
//         />
//     );
// }

function Search() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.trim()) {
            setAnchorEl(event.currentTarget); // Set the TextField as anchor
            setOpen(true); // Show Popper when there's input
        } else {
            setOpen(false); // Hide Popper when input is empty
        }
    };

    return (
        <>
            <TextField
                size="small"
                value={inputValue}
                onChange={handleInputChange}
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