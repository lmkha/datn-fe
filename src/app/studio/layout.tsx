'use client';

import Header from "@/core/components/header";
import { Box } from "@mui/material";
import Drawer from "./components/drawer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

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
                    position: "sticky",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    borderBottom: "1px solid lightgray",
                }}
            >
                <Header onOpenDrawerChange={() => setOpenDrawer(!openDrawer)} />
            </Box>
            {/* Content (Drawer + Main) */}
            <Box
                sx={{
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
