'use client';

import { Avatar, Box, MenuList } from "@mui/material"
import DrawerMenuItem from "./drawer-menu-item"
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useRouter } from "next/navigation";
import { useContentContext } from "@/contexts/content-context";

interface DrawerProps {
    openDrawer: boolean;
}

export default function Drawer(props: DrawerProps) {
    const router = useRouter();
    const { state } = useContentContext();

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
                    onClick={() => { router.push('/') }}
                    icon={<HomeIcon />}
                    text={'For you'}
                    sx={{ height: 50 }}
                    selected={state.currentDrawerItem === 'FOR_YOU'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push('/explore') }}
                    icon={<ExploreOutlinedIcon />}
                    text={'Explore'}
                    sx={{ height: 50 }}
                    selected={state.currentDrawerItem === 'EXPLORE'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push('/following') }}
                    icon={<PeopleAltIcon />}
                    text={'Following'}
                    sx={{ height: 50 }}
                    selected={state.currentDrawerItem === 'FOLLOWING'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push('/@lmkha') }}
                    icon={<Avatar
                        src="/images/avatar.jpg"
                        alt="avatar"
                        sx={{
                            width: 25,
                            height: 25,
                        }}
                    />}
                    text={'Profile'}
                    sx={{ height: 50 }}
                    selected={state.currentDrawerItem === 'PROFILE'}
                />

            </MenuList>
        </Box >
    )
}