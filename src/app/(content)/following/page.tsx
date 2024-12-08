'use client';

import { getAllFollowings } from "@/services/real/user";
import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FollowingItem from "./components/following-item";

interface PageState {
    followingUsers: any[];
}
export default function FollowingPage() {
    const [state, setState] = useState<PageState>({
        followingUsers: [],
    });

    const fetchData = async () => {
        getAllFollowings().then((result) => {
            if (result.success && result.followingUsers) {
                setState({
                    ...state,
                    followingUsers: result.followingUsers,
                });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
        }}>
            <Stack spacing={2} sx={{
                padding: 2,
                width: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
                justifyContent: 'center',
            }}>
                {/* Page title */}
                <Typography variant="h5" fontWeight={'bold'}>All Following</Typography>
                <Divider />
                {/* Following list */}
                {state.followingUsers.map((followingUser) => (
                    <FollowingItem key={followingUser.username} followingUser={followingUser} />
                ))}
            </Stack>
        </Stack>
    );
}