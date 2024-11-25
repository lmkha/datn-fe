'use client';

import { useContentContext } from "@/contexts/content-context";
import { useEffect } from "react";

export default function ExplorePage() {
    const { dispatch } = useContentContext();

    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'EXPLORE' });
    }, []);

    return (
        <>
            <h1>Explore Page</h1>
            <p>Explore page content</p>
        </>
    );
}
