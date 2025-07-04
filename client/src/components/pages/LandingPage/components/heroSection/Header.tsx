import React from 'react'
import Searchbar from './Searchbar'
import Image from 'next/image'

const Header = () => {
    return (
        <div className="relative w-full py-10 pt-10 text-center font-jakarta text-black">
            <div className="absolute top-0 left-0 h-2/3 w-screen bg-[#F5F8F3]"></div>
            <div className='max-w-[1400px] m-auto relative flex flex-col items-center justify-center md:gap-8 gap-4'>
            <div className="text-2xl md:text-5xl font-[600] md:w-1/2 z-1">Your Trusted Platform for Honest Feedbacks</div>
            <div className="md:text-base text-xs w-2/3 text-[#878787] z-1">With stellar one-click reports and unmatched support, see how <br /> Circle will make a difference in your business.</div>
            <Searchbar />
            <div className="masked">
                <Image
                    src={"/images/7.jpg"}
                    width={900}
                    height={500}
                    alt='header-background'
                    className='w-full md:max-h-[500px] max-h-[300px]'
                    priority
                />
            </div>
            </div>
        </div>
    )
}


export default Header
