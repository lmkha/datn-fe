'use client';

import { Avatar, Box, MenuList } from "@mui/material"
import DrawerMenuItem from "./drawer-menu-item"
import ContactPageIcon from '@mui/icons-material/ContactPage';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/user-context";
import { get } from "@/hooks/use-local-storage";

interface DrawerProps {
    openDrawer: boolean;
    selectedRoute: 'EDIT_PROFILE' | 'CHANGE_PASSWORD' | 'PROFILE';
}

export default function Drawer(props: DrawerProps) {
    const router = useRouter();
    // const { state: userState } = useUserContext();
    const userState = get('user');

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
            <MenuList sx={{ width: '100%' }}>
                <DrawerMenuItem
                    onClick={() => { router.push('/settings') }}
                    icon={<ContactPageIcon />}
                    text={'Edit profile'}
                    sx={{ height: 50 }}
                    selected={props.selectedRoute === 'EDIT_PROFILE'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push('/settings/change-password') }}
                    icon={<VpnKeyIcon />}
                    text={'Change password'}
                    sx={{ height: 50 }}
                    selected={props.selectedRoute === 'CHANGE_PASSWORD'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push(`/@${userState.username}`) }}
                    icon={<Avatar
                        src="/images/avatar.png"
                        alt="avatar"
                        sx={{
                            width: 25,
                            height: 25,
                        }}
                    />}
                    text={'Profile'}
                    sx={{ height: 50 }}
                    selected={props.selectedRoute === 'PROFILE'}
                />

            </MenuList>
        </Box >
    )
}