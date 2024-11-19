'use client';

import Header from "@/core/components/header";
import { Box, Paper, Stack } from "@mui/material";
import Drawer from "./components/drawer";
import { StudioProvider, useStudioContext } from "@/contexts/studio-context";

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
    const { state, dispatch } = useStudioContext();
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
                }}
            >
                {/* Drawer */}
                <Drawer openDrawer={state?.openDrawer || false} />
                {/* Main */}
                <Box
                    sx={{
                        flexGrow: 1,
                        marginLeft: state?.openDrawer ? "15%" : "4%",
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
