"use client";

import { useEffect } from "react";
import Image from 'next/image';
import Signup from '@/components/Landing/Signup';
import Signin from '@/components/Landing/Signin';
import { Loader } from '@/components/ui/loader';
import { useUserProfile } from '@/hooks/useProfile';
import { UserBubble } from '../Common/UserBubble';
import { NavigationMenuItems } from './NavigationMenuItems';

const Navbar = () => {

    const { user, loading } = useUserProfile();

    useEffect(() => {
        if (user && user.role === "admin") {
            //redirect("/dashboard");
        }
    }, [user]);

    return (
        <div className="fixed top-0 left-0 flex h-max w-screen items-center justify-center bg-white shadow-md md:px-8 z-50 text-black">
            <div className="w-5xl flex items-center justify-between py-4">

                <div className="flex items-center justify-center gap-2 md:gap-4">
                    <Image src="/images/logo.png" width={50} height={50} alt="ed-cred logo" className="w-8 md:w-[50px]" />
                    <div className="text-lg font-[500] md:text-2xl">Ed-Cred</div>
                </div>

                <div className="flex items-center gap-4">
                    <NavigationMenuItems userCategoryId={user && user.category ? user.category.id : 0} />
                    {
                        loading ? 
                            <Loader /> :
                            user ? 
                                <UserBubble user={user} /> :
                                <div className="flex gap-2 md:gap-4">
                                    <Signup />
                                    <Signin />
                                </div>
                    }
                </div>
            </div>
        </div>
    )
};



export default Navbar;
