import { Avatar, Stack, Typography } from "@mui/material";

interface AuthorInfoProps {
    username: string;
    fullName: string;
    subscribers: string;
}
export default function AuthorInfoComponent(props: AuthorInfoProps) {
    return (
        <>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Avatar
                    src="/images/avatar.jpg"
                    alt="avatar"
                    sx={{
                        width: 50,
                        height: 50,
                    }}
                />
                <Stack>
                    <Typography variant="body1" fontWeight={'bold'}>{props.username}</Typography>
                    <Typography variant="body2">{props.fullName}</Typography>
                    <Typography variant="body2" color='textSecondary'>{props.subscribers} subscribers</Typography>
                </Stack>
            </Stack>
        </>
    )
}
