'use client';

import UserAvatar from "@/core/components/avatar";
import { formatNumberToShortText } from "@/core/logic/format";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface AuthorInfoProps {
    user: any;
}
export default function AuthorInfoComponent(props: AuthorInfoProps) {
    const router = useRouter();

    return (
        <>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <UserAvatar src={props?.user?.profilePic} size={50} />
                <Stack>
                    <Typography
                        onClick={() => {
                            props?.user?.username && router.push(`/@${props.user?.username}`);
                        }}
                        sx={{
                            cursor: 'pointer',
                        }}
                        variant="body1"
                        fontWeight={'bold'}
                    >
                        {props.user?.username || 'username'}
                    </Typography>

                    <Typography
                        onClick={() => {
                            props?.user?.username && router.push(`/@${props.user?.username}`);
                        }}
                        sx={{
                            cursor: 'pointer',
                        }}
                        variant="body2"
                    >
                        {props.user?.fullName || 'Full Name'}
                    </Typography>
                    <Typography variant="body2" color='textSecondary'>{props.user?.followerCount ? formatNumberToShortText(props.user?.followerCount) : '0'} followers</Typography>
                </Stack>
            </Stack>
        </>
    )
}
