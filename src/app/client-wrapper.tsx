'use client';

import { AppProvider } from "@/contexts/app-context";
import { UserProvider } from "@/contexts/user-context";
import React from "react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </AppProvider>
    );
};

export default ClientWrapper;
