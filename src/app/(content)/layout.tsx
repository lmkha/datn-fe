'use client';

import Header from "@/core/components/header";
import { Box } from "@mui/material";
import Drawer, { SelectedRoute } from "./components/drawer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ContentProvider } from "@/contexts/content-context";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ContentProvider>
            <LayoutContent>{children}</LayoutContent>
        </ContentProvider>
    );
}

function LayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [openDrawer, setOpenDrawer] = useState<boolean>(true);
    const pathname = usePathname();
    const router = useRouter();
    const [selectedRoute, setSelectedRoute] = useState<SelectedRoute>('FOR_YOU');


    useEffect(() => {
        setOpenDrawer(true);
        if (pathname === '/') {
            setSelectedRoute('FOR_YOU');
        }
        if (pathname === '/explore') {
            setSelectedRoute('EXPLORE');
        }
        if (pathname === '/following') {
            setSelectedRoute('FOLLOWING');
        }
        if (pathname.startsWith('/@')) {
            setSelectedRoute('PROFILE');
            if (pathname.includes('/videos/')) {
                setOpenDrawer(false);
                setSelectedRoute('NONE');
            }
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
                    zIndex: 1000,
                    borderBottom: "1px solid lightgray",
                    height: "57px",
                    backgroundColor: "white"
                }}
            >
                <Header
                    title="MeTube"
                    logoClickRoute="/"
                    onOpenDrawerChange={() => setOpenDrawer(!openDrawer)}
                    onSearch={() => { }}
                    onUpload={() => router.push('/studio/upload')}
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
                }}
            >
                {/* Drawer */}
                <Drawer
                    openDrawer={openDrawer}
                    selectedRoute={selectedRoute}
                />
                {/* Main */}
                <Box
                    sx={{
                        flexGrow: 1,
                        marginLeft: openDrawer ? "15%" : "4%",
                        transition: "margin-left 0.3s ease",
                        borderLeft: "1px solid lightgray",
                        overflow: "auto",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
