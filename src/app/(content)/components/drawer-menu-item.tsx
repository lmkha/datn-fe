import { ListItemIcon, ListItemText, MenuItem, SxProps, Theme, Typography } from "@mui/material";

interface DrawerMenuItemProps {
    onClick?: () => void;
    selected?: boolean;
    icon?: React.ReactNode;
    text?: string;
    sx?: SxProps<Theme>
}

export default function DrawerMenuItem(props: DrawerMenuItemProps) {
    return (
        <MenuItem
            sx={{
                ...props.sx,
                height: 50,
                color: props?.selected ? '#FE2C55' : 'black',
                backgroundColor: props?.selected ? '#FFF2F5' : 'white',
            }}
            onClick={props.onClick}
        // selected={props.selected}

        >
            <ListItemIcon sx={{
                color: props?.selected ? '#FE2C55' : 'black',
            }}>
                {/* <HomeIcon /> */}
                {props.icon}
            </ListItemIcon>
            <ListItemText>
                {/* For you */}
                <Typography variant="body1">{props.text}</Typography>
            </ListItemText>
        </MenuItem>
    )
}
