'use client';

import { AppProvider } from "@/contexts/app-context";
import { AuthProvider } from "@/contexts/auth-context";
import { UserProvider } from "@/contexts/user-context";
import AlertComponent from "../core/components/alert";
import React from "react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AuthProvider>
            <AlertComponent />
        </AppProvider>
    );
};

export default ClientWrapper;
