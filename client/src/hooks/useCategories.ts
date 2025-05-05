import { useEffect, useState } from "react";
import { getRequest } from "@/api/config";
import { Category } from "@/types/user";

type UseUserProfileResult = {
    categories:  Category[] | null;
    loading: boolean;
    error:   string | null;
};

export function useCategories(): UseUserProfileResult {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const res = await getRequest("/category/");
                if (!res || !res.ok) throw new Error("Failed to fetch user profile");

                const json = await res.json();

                if (isMounted) setCategories(json);
            } catch (err: any) {
                if (isMounted) setError(err.message ?? "Unknown error");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, []);

    return { categories, loading, error };
}
