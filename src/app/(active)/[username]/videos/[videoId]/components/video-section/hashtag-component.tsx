import { Chip } from "@mui/material";

interface HashtagComponentProps {
    text: string;
}
export default function HashtagComponent(props: HashtagComponentProps) {
    return (
        <Chip label={props.text} onClick={() => { }} />
    );
}
