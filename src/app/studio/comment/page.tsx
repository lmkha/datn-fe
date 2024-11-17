'use client';

import { useEffect } from "react";
import { useStudioContext } from "@/contexts/studio-context";

export default function CommentPage() {
    const { state, dispatch } = useStudioContext();
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'Comments' });
    }, []);

    return (
        <div>
            <h1>Comment Page</h1>
        </div>
    );
}
