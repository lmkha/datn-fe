'use client';

import { Button } from "@mui/material";
import { useState } from "react";

export default function TestPage() {
    const [name, setName] = useState<string>();
    return (
        <>
            <Button onClick={() => {
                setName('Hello World');
                console.log(name);
            }}>Click me</Button>
        </>
    );
}