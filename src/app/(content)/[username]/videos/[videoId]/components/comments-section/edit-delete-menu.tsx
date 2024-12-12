import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

interface EditDeleteCommentMenuProps {
    onDelete: () => void;
    onEdit?: () => void;
}
export default function EditDeleteCommentMenu(props: EditDeleteCommentMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        props.onDelete();
        handleClose();
    };
    const handleEdit = () => {
        if (props.onEdit) {
            props.onEdit();
        }
        handleClose();
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {props?.onEdit && (<MenuItem onClick={handleEdit}>
                    Edit
                </MenuItem>)}
                <MenuItem onClick={handleDelete}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
