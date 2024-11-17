'use client';

import { useEffect } from "react";
import { useStudioContext } from "@/contexts/studio-context";
import { Paper } from "@mui/material";

export default function PostPage() {
    const { state, dispatch } = useStudioContext();
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'Posts' });
    }, []);

    return (
        <>
            <h1>Posts</h1>
        </>
    );
}
