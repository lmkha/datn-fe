'use client';

import { Box, Button, Divider, MenuList, Stack } from "@mui/material"
import DrawerMenuItem from "./drawer-menu-item"


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { DrawerItem, useStudioContext } from "@/contexts/studio-context";
import { useRouter } from "next/navigation";

interface DrawerProps {
    openDrawer: boolean;
    selectedDrawerItem: DrawerItem;
}

export default function Drawer(props: DrawerProps) {
    const router = useRouter();

    const handleDrawerItemClick = (item: DrawerItem) => {
        switch (item) {
            case 'Upload':
                router.push('/studio/upload');
                break;
            case 'Dashboard':
                router.push('/studio');
                break;
            case 'Posts':
                router.push('/studio/post');
                break;
            case 'Comments':
                router.push('/studio/comment');
                break;
            case 'GoBack':
                router.push('/');
                break;
            default:
                break;
        }
    };

    return (
        < Box
            sx={{
                width: props.openDrawer ? '15%' : '3%',
                height: '100vh',
                position: 'fixed',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                zIndex: 1200,
                backgroundColor: 'white',
            }}
        >
            <Stack>
                <Button sx={{
                    margin: 1,
                    textTransform: 'none',
                    height: 50,
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: props.selectedDrawerItem === 'Upload' ? 'gray' : 'white',
                    backgroundColor: props.selectedDrawerItem === 'Upload' ? 'lightgray' : '#EA284E',
                }}
                    onClick={() => handleDrawerItemClick('Upload')}
                    disabled={props.selectedDrawerItem === 'Upload'}
                >
                    Upload
                </Button>
                <Divider sx={{
                    margin: '10px 0',
                }} />

                <MenuList sx={{ width: '100%' }}>
                    <DrawerMenuItem
                        icon={<HomeOutlinedIcon />}
                        text={'Dashboard'}
                        sx={{ height: 50 }}
                        onClick={() => handleDrawerItemClick('Dashboard')}
                        selected={props.selectedDrawerItem === 'Dashboard'}
                    />

                    <DrawerMenuItem
                        icon={<FormatListBulletedRoundedIcon />}
                        text={'Posts'}
                        sx={{ height: 50 }}
                        onClick={() => handleDrawerItemClick('Posts')}
                        selected={props.selectedDrawerItem === 'Posts'}
                    />

                    <DrawerMenuItem
                        icon={<MessageOutlinedIcon />}
                        text={'Comments'}
                        sx={{ height: 50 }}
                        onClick={() => handleDrawerItemClick('Comments')}
                        selected={props.selectedDrawerItem === 'Comments'}
                    />

                    <DrawerMenuItem
                        icon={<KeyboardBackspaceRoundedIcon />}
                        text={'Back to MeTube'}
                        sx={{ height: 50 }}
                        onClick={() => handleDrawerItemClick('GoBack')}
                        selected={props.selectedDrawerItem === 'GoBack'}
                    />
                </MenuList>
            </Stack>
        </Box >
    )
}