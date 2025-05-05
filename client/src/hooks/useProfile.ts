import { useEffect, useState } from "react";
import { getRequest } from "@/api/config";
import { UserProfile } from "@/types/user";

type UseUserProfileResult = {
    user:    UserProfile | null;
    loading: boolean;
    error:   string | null;
};

export function useUserProfile(): UseUserProfileResult {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const res = await getRequest("/auth/profile/");
                if (!res || !res.ok) throw new Error("Failed to fetch user profile");

                const json = await res.json();

                if (isMounted) setUser(json);
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

    return { user, loading, error };
}
