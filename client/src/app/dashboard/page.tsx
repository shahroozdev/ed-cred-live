"use client";
import { useEffect } from "react";
import { OverviewTab } from "@/components/MainDashboard/Overview";
import { Navbar } from "@/components/Common/Navbar";
import { redirect } from "next/navigation";
import { useUserProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/loader";

const Dashboard = () => {

    const { user, loading } = useUserProfile();
    useEffect(() => {
        if (user && user.role !== "admin") {
            redirect("/");
        }
    }, []);

    if (loading || !user) {
        return <div className="w-full h-screen flex items-center justify-center"><Loader /></div>
    } 

    return (
        <div className="font-inter flex flex-col">
            <Navbar />
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <OverviewTab />
            </div>
        </div>
    )
};
export default Dashboard;
