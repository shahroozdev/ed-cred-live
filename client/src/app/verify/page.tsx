'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/api/config';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok) setStatus('success');
                else throw new Error();
            })
            .catch(() => setStatus('error'));
    }, [token]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-between">
            <Navbar />
            <div className="text-2xl font-semibold w-full flex items-center h-full justify-center">
            {
                status === 'loading' ?
                <Loader /> :
                    status === "success" ? 
                        <div className='flex flex-col gap-4'>
                                You are successfully verified
                                <Button onClick={() => router.push("/user/dashboard")}>Go to dashboard</Button>
                            </div> :
                            <div className='flex flex-col gap-4'>
                                You are already verified
                                <Button onClick={() => router.push("/user/dashboard")}>Go to dashboard</Button>
                            </div>
            }
            </div>
            <Footer />
        </div>
    )
}
