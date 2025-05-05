import { useEffect, useState } from "react";
import { getRequest } from "@/api/config";

type UseFetcherResult<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

type CachedData<T> = {
    timestamp: number;
    data: T;
};

const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useFetcher<T = any>(route: string, cacheTimeout: number = CACHE_TIMEOUT): UseFetcherResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const cacheKey = `useFetcherCache:${route}`;

        const fetchData = async () => {
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const parsed: CachedData<T> = JSON.parse(cached);
                    const isValid = Date.now() - parsed.timestamp < cacheTimeout;

                    if (isValid) {
                        setData(parsed.data);
                        setLoading(false);
                        return;
                    } else {
                        localStorage.removeItem(cacheKey); // Invalidate cache
                    }
                }

                setLoading(true);
                const res = await getRequest(route);
                if (!res || !res.ok) throw new Error("Failed to fetch");

                const json = await res.json();
                if (isMounted) {
                    const toCache: CachedData<T> = {
                        timestamp: Date.now(),
                        data: json,
                    };
                    localStorage.setItem(cacheKey, JSON.stringify(toCache));
                    setData(json);
                    setError(null);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message ?? "Unknown error");
                    setData(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [route, cacheTimeout]);

    return { data, loading, error };
}
