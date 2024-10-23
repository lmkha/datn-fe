'use client';

import { useParams } from "next/navigation";

// User profile: can be my own or someone else's
export default function Page() {
    const params = useParams();
    return (
        <div>
            <h1>Profile of {params.username}</h1>
        </div>
    );
}