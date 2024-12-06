'use client';

import { Chip } from "@mui/material";
import { useRouter } from "next/navigation";

interface HashtagComponentProps {
    text: string;
}
export default function HashtagComponent(props: HashtagComponentProps) {
    const router = useRouter();
    return (
        <Chip label={props.text} onClick={() => {
            router.push(`/result/?tag=${props.text}`);
        }} />
    );
}
