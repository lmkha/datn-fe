'use client';

import { AppProvider } from "@/contexts/app-context";
import { AuthProvider } from "@/contexts/auth-context";
import { UserProvider } from "@/contexts/user-context";
import React from "react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AuthProvider>
        </AppProvider>
    );
};

export default ClientWrapper;
