import { ListItemIcon, ListItemText, MenuItem, SxProps, Theme } from "@mui/material";

interface DrawerMenuItemProps {
    icon?: React.ReactNode;
    text?: string;
    selected?: boolean;
    sx?: SxProps<Theme>
    onClick?: () => void;
}

export default function DrawerMenuItem(props: DrawerMenuItemProps) {
    return (
        <MenuItem sx={{ height: 50, ...props.sx }}
            onClick={props.onClick}
            selected={props.selected}
        >
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
