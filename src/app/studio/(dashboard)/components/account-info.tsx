'use client';

import { Stack, Typography } from "@mui/material";
import { get } from '@/hooks/use-local-storage';
import UserAvatar from '@/core/components/avatar';

export default function AccountInfo() {
    const user = get<any>('user');
    return (
        <Stack spacing={1} sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 2,
        }}>
            <Stack direction={'row'} spacing={2}>
                <UserAvatar src={user?.profilePic} size={100} />
                <Stack>
                    <Typography variant="h5" fontWeight={'bold'}>@{user?.username}</Typography>
                    <Typography variant="body1">{user?.fullName}</Typography>
                </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-evenly'}>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>{user?.followerCount}</Typography>
                    <Typography color='textSecondary'>Followers</Typography>
                </Stack>

                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>{user?.followingCount}</Typography>
                    <Typography color='textSecondary'>Following</Typography>
                </Stack>

                {/* <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>0</Typography>
                    <Typography color='textSecondary'>Profile views</Typography>
                </Stack> */}
            </Stack>
        </Stack>
    );
}