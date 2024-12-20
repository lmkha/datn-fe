'use client';

import { Avatar, Box, MenuList } from "@mui/material"
import DrawerMenuItem from "./drawer-menu-item"
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useRouter } from "next/navigation";
import { get } from "@/hooks/use-local-storage";
import { CldImage } from "next-cloudinary";
import UserAvatar from "@/core/components/avatar";

export type SelectedRoute = 'FOR_YOU' | 'EXPLORE' | 'FOLLOWING' | 'PROFILE' | 'NONE';
interface DrawerProps {
    openDrawer: boolean;
    selectedRoute: SelectedRoute;
}

export default function Drawer(props: DrawerProps) {
    const router = useRouter();
    const accessToken = get("accessToken");
    const user = get<any>('user');

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
                    selected={props.selectedRoute === 'FOR_YOU'}
                />

                <DrawerMenuItem
                    onClick={() => { router.push('/explore') }}
                    icon={<ExploreOutlinedIcon />}
                    text={'Explore'}
                    sx={{ height: 50 }}
                    selected={props.selectedRoute === 'EXPLORE'}
                />

                {accessToken && user?.username && (
                    <>
                        <DrawerMenuItem
                            onClick={() => { router.push('/following') }}
                            icon={<PeopleAltIcon />}
                            text={'Following'}
                            sx={{ height: 50 }}
                            selected={props.selectedRoute === 'FOLLOWING'}
                        />
                        <DrawerMenuItem
                            onClick={() => { router.push(`/@${user?.username}`) }}
                            icon={<UserAvatar src={user?.profilePic} size={25} />}
                            text={'Profile'}
                            sx={{ height: 50 }}
                            selected={props.selectedRoute === 'PROFILE'}
                        />
                    </>
                )}
            </MenuList>
        </Box >
    )
}