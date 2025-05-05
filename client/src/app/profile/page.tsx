"use client";
import { useState, useEffect } from "react";
import { BaseUser } from "./../../../../shared/types/user"
import { getProfile } from "@/api/auth";
import { BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/loader";

const ProfilePage = () => {

    const { user, loading } = useUserProfile();

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center"><Loader /></div>
    }

    return (
        <div className="w-full h-screen content-center space-y-8">

            <div className="border-2 border-muted rounded-md p-4 w-lg mx-auto">
                <div className="font-semibold text-4xl flex items-center gap-4">
                    <div className="w-18 h-18 min-w-18 min-h-18 rounded-full bg-foreground flex items-center justify-center text-background">
                        {user.name.slice(0, 2)}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 items-center">
                            <div className="capitalize">{user.name}</div>
                            {user.isVerified ? <BadgeCheckIcon stroke="green" /> : <BadgeMinusIcon stroke="red" />}
                        </div>
                        <p className="text-base text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </div>


            <div className="border-2 border-muted rounded-md p-4 w-lg mx-auto">
                <div className="text-3xl flex gap-4">
                    Subscription Plan
                    <div>{user.subscription.status}</div>
                </div>
                <div className="text-3xl flex gap-4">
                    Role
                    <div>{user.role}</div>
                </div>
                <div className="text-3xl flex gap-4">
                    Category
                    <div>{user.category.name}</div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
