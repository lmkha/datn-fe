'use client';

import { get } from "@/hooks/use-local-storage";
import { useParams } from "next/navigation";
import MyProfile from "./user-profile/my-profile";
import OtherProfile from "./user-profile/other-profile";

export default function ProfilePage() {
    const params = useParams();
    const { username } = params;
    const actualUsername = username ? decodeURIComponent((username as string)).replace('@', '') : '';
    const currentUser = get<any>('user');

    return (
        currentUser && currentUser?.username && currentUser?.username === actualUsername ?
            <MyProfile username={actualUsername} /> :
            <OtherProfile username={actualUsername} />
    );
}
