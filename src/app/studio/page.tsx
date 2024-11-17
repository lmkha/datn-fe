'use client';

import { useStudioContext } from "@/contexts/studio-context";
import { useEffect } from "react";

export default function StudioDashBoard() {
    const { state, dispatch } = useStudioContext();
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DRAWER_ITEM', payload: 'Dashboard' });
    }, []);
    return (
        <>
            <h1>Studio Dashboard</h1>
        </>
    );
}
