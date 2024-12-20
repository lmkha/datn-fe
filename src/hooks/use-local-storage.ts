import { useState, useEffect } from "react";

type Key = 'accessToken' | 'user' | 'searchQuery';

export default function useLocalStorage<T>(key: Key, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to save to localStorage:", error);
        }
    }, [key, value]);

    return [value, setValue];
}

export function set<T>(key: Key, value: T) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}

export function setAccessToken(value: string) {
    try {
        window.localStorage.setItem('accessToken', JSON.stringify(value));
    } catch (error) {
        console.error("Failed to save accessToken:", error);
    }
}

export function get<T>(key: Key): T | null {
    try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : null;
    } catch {
        return null;
    }
}

export function remove(key: Key) {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error("Failed to remove from localStorage:", error);
    }
}
