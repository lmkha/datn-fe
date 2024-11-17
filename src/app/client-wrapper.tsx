'use client';

import { AppProvider } from "@/contexts/app-context";
import React from "react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AppProvider>{children}</AppProvider>;
};

export default ClientWrapper;
