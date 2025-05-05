"use client";
import { getProfile } from '@/api/auth';
import { BellIcon, LogOutIcon, MailIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage  } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const TopBar = () => {
    const [profile, setProfile] = useState<any>(null);
    const router = useRouter();
    useEffect(() => {
        const setup = async () => {
            const profile = await getProfile();
            setProfile(profile);
        }
        setup();
    }, []);

    return (
        <div className='fixed top-0 left-0 w-full shadow-sm h-max p-2 flex gap-8 items-center px-8 bg-white'>
            <Logo />
            <SearchBar />
            <div className='flex gap-4 ml-auto items-center justify-center'>
                <BellIcon size={20} />
                <MailIcon size={20}/>
                <div className='h-8 w-0.5 bg-black/10'></div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer'>
                        <Avatar>
                            <AvatarImage src='/images/dp.png' />
                            <AvatarFallback>{profile && profile.username}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button variant={"destructive"} className='cursor-pointer' onClick={() => router.push("/")}>
                                <LogOutIcon stroke='white' />
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className='font-semibold text-left'>
                    {profile && profile.username}
                    <br />
                    <div className='font-normal text-xs'>{profile && profile.email}</div>
                </div>
            </div>
        </div>
    )
}

const Logo = () => (
    <div className='flex items-center justify-center gap-4 px-2' >
        <div><Image src='/images/logo.png' width={80} height={80} alt='ed-cred logo' className='w-8 md:w-[40px]' /></div>
        <div className='text-lg font-[500] md:text-2xl'>Ed-Cred</div>
    </div>
)

const SearchBar = () => {

    return (
        <div className='flex gap-2 items-center'>
            <input type="text" className='py-2 px-4 bg-black/5 rounded-md' placeholder='search' />
            <button className='bg-black/5 rounded-full p-2 cursor-pointer'><SearchIcon className='' /></button>
        </div>
    )
}

export default TopBar;
