"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // TODO: Verify if the token is valid. If not regenerate it.
        // If the regeneration fails, handle that case as well.
        if (!token) {
            router.replace("/");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
