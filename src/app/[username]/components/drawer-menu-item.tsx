import { ListItemIcon, ListItemText, MenuItem, SxProps, Theme } from "@mui/material";

interface DrawerMenuItemProps {
    icon?: React.ReactNode;
    text?: string;
    sx?: SxProps<Theme>
}

export default function DrawerMenuItem(props: DrawerMenuItemProps) {
    return (
        <MenuItem sx={{ height: 50, ...props.sx }}>
            <ListItemIcon>
                {/* <HomeIcon /> */}
                {props.icon}
            </ListItemIcon>
            <ListItemText>
                {/* For you */}
                {props.text}
            </ListItemText>
        </MenuItem>
    )
}
