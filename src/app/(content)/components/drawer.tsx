import { Avatar, Box, MenuList } from "@mui/material"
import DrawerMenuItem from "./drawer-menu-item"
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';

interface DrawerProps {
    openDrawer: boolean;
}

export default function Drawer(props: DrawerProps) {
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
                    icon={<HomeIcon />}
                    text={'For you'}
                    sx={{ height: 50 }}
                />

                <DrawerMenuItem
                    icon={<ExploreOutlinedIcon />}
                    text={'Explore'}
                    sx={{ height: 50 }}
                />

                <DrawerMenuItem
                    icon={<PeopleAltIcon />}
                    text={'Following'}
                    sx={{ height: 50 }}
                />

                <DrawerMenuItem
                    icon={<SendIcon />}
                    text={'Messages'}
                    sx={{ height: 50 }}
                />

                <DrawerMenuItem
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
                />

            </MenuList>
        </Box >
    )
}