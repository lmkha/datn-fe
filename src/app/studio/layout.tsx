'use client';

import Header from "@/core/components/header";
import { Box } from "@mui/material";
import Drawer from "./components/drawer";
import { StudioProvider, useStudioContext } from "@/contexts/studio-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StudioProvider>
            <LayoutContent>{children}</LayoutContent>
        </StudioProvider>
    );
}

function LayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { state } = useStudioContext();
    const pathname = usePathname();
    const [selectedDrawerItem, setSelectedDrawerItem] = useState<'Upload' | 'Dashboard' | 'Posts' | 'Comments' | 'GoBack'>('Dashboard');

    useEffect(() => {
        if (pathname.startsWith('/studio/upload')) {
            setSelectedDrawerItem('Upload');
        } else if (pathname.startsWith('/studio/post')) {
            setSelectedDrawerItem('Posts');
        } else if (pathname.startsWith('/studio/comment')) {
            setSelectedDrawerItem('Comments');
        } else if (pathname.startsWith('/studio')) {
            setSelectedDrawerItem('Dashboard');
        }
    }, [pathname]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 999,
                    borderBottom: "1px solid lightgray",
                    height: "57px",
                    backgroundColor: "white",
                }}
            >
                <Header
                    title="MeTube Studio"
                    logoClickRoute="/studio"
                />
            </Box>
            {/* Content (Drawer + Main) */}
            <Box
                sx={{
                    marginTop: "57px",
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    width: "100%",
                    height: "calc(100% - 57px)",
                }}
            >
                {/* Drawer */}
                <Drawer
                    openDrawer={state?.openDrawer || false}
                    selectedDrawerItem={selectedDrawerItem}
                />
                {/* Main */}
                <Box
                    sx={{
                        flexGrow: 1,
                        marginLeft: state?.openDrawer ? "15%" : "4%",
                        transition: "margin-left 0.3s ease",
                        borderLeft: "1px solid lightgray",
                        overflowY: "auto",
                        backgroundColor: '#F8F8F8',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
