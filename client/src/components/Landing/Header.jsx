import React from 'react'
import Searchbar from './Searchbar'
import Image from 'next/image'

const Header = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center gap-8 py-10 pt-30 text-center font-jakarta text-black">
            <div className="absolute top-0 left-0 h-2/3 w-full bg-[#FCFBF3]"></div>
            <div className="text-2xl md:text-5xl font-[600] md:w-1/2 z-10">Your Trusted Platform for Honest Feedbacks</div>
            <div className="md:text-base text-xs w-2/3 text-[#878787] z-10">With stellar one-click reports and unmatched support, see how <br /> Circle will make a difference in your business.</div>
            <Searchbar />
            <div className="masked">
                <Image
                    src={"/images/background.png"}
                    width={900}
                    height={700}
                    alt='header-background'
                />
            </div>
        </div>
    )
}


export default Header
