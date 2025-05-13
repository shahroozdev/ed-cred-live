import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { ArrowRightIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import { Button } from '../atoms'

const Footer = () => {
    const date = new Date();

    return (
        <div className='bg-[#1B201E] w-screen'>
        <div className="grid grid-cols-1 gap-10 p-10 max-w-[1400px] m-auto pt-20 font-[400] text-white md:grid-cols-5">
            <div className='flex flex-col gap-4 md:col-span-2'>
                <div>
                    <Image src={"/images/logo.png"} width={100} height={100} alt='ed-cred-logo' />
                </div>
                <div>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                </div>
            </div>
            <div className="flex flex-col gap-4 text-[400]">
                <div className="text-2xl font-[700]">Quick Links</div>
                <Link href={'/about'}>About</Link>
                <Link href={'/contact'}>Contact Us</Link>
                <Link href={'/terms-of-use'}>Terms & Conditions</Link>
                <Link href={'/web-use-policy'}>Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 md:col-span-2">
                <div className='text-2xl font-[700]'>Try It Today</div>
                <div className='text-[400]'>
                    Get started for free. Add your whole team as your needs grow.
                </div>
                <div>
                    <Button variant='primary'>
                        <div className='flex gap-2 text-xl items-center'>
                            <div>Join Now</div>
                            <ArrowRightIcon />
                        </div>
                    </Button>
                </div>
            </div>
            <div className="border-t-2 border-[#2E4E73] pt-4 md:col-span-5">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <p>Copyright &#169; {date?.getFullYear()} High-House. All Rights Reserved.</p>
                    <div className='flex gap-8'>
                        <FacebookIcon fill='white' />
                        <TwitterIcon fill='white' />
                        <LinkedinIcon fill='white' />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Footer
