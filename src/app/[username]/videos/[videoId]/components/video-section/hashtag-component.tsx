import { Chip } from "@mui/material";

export default function HashtagComponent(props: { text: string }) {
    return (
        <Chip label={props.text} onClick={() => { }} />
    );
}