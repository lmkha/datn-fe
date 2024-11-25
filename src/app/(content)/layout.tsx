'use client';

import Header from "@/core/components/header";
import { Box } from "@mui/material";
import Drawer from "./components/drawer";
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

    useEffect(() => {
        if (pathname.startsWith('/@') && pathname.includes('/videos/')) {
            setOpenDrawer(false);
        } else {
            setOpenDrawer(true);
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
                }}
            >
                <Header
                    title="MeTube"
                    logoClickRoute="/"
                    onOpenDrawerChange={() => setOpenDrawer(!openDrawer)}
                    onSearch={() => { }}
                    onNotification={() => { }}
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
                <Drawer openDrawer={openDrawer} />
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
