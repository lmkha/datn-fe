import { useState, useEffect } from "react";

type Key = 'accessToken' | 'user' | 'searchQuery';

export default function useLocalStorage(key: Key, defaultValue: any) {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue !== null) {
            setValue(JSON.parse(storedValue));
        }
    }, [key]);
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export function set(key: Key, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function get(key: Key) {
    if (typeof window == "undefined") {
        return null;
    }
    const value = window.localStorage.getItem(key);
    if (value !== null) {
        return JSON.parse(value);
    }
    return null;
}

export function remove(key: Key) {
    window.localStorage.removeItem(key);
}
