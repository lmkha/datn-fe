'use client';

import { useEffect, useRef, useState } from "react";

export default function TestPage() {
    const [data, setData] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async (page: number) => {
        console.log("Fetching data from page:", page);
        setIsFetching(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setData((prevData) => [...prevData, ...Array.from({ length: 10 }, (_, i) => `Item ${prevData.length + i + 1}`)]);
        setIsFetching(false);
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [isFetching]);

    return (
        <div>
            <h1>Infinite Scroll with Intersection Observer</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div
                ref={observerRef}
                className="h-20 bg-transparent"
            />
            {isFetching && <p>Loading more data...</p>}
        </div>
    );
};

