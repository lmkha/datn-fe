'use client';

import { useParams } from "next/navigation";

// Videos of a user
export default function VideosPage() {
    const { username } = useParams();
    return (
        <div>
            <h1>Videos of {username}</h1>
        </div>
    );
}
