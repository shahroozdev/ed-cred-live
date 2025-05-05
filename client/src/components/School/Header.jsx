import React from 'react'

const Header = () => {
    return (
        <div>
            <div className='relative flex w-full flex-col items-center gap-7 py-15 pt-30 font-jakarta bg-[#F5F8F3]'>
                <div className='text-black text-2xl md:text-5xl font-[500]'>
                    Review Your School 
                </div>
                <div className=' flex flex-col items-center text-lg text-[#878787]'>
                    <p>Please Rate Each Item on a Scale of 1 - 5 Apples. Top Rating = 5 Apples</p>
                    <p>Your review will be posted anonymously unless you expressly tell us</p>
                    <p> otherwise</p>
                </div>
            </div>
        </div>
    )
}

export default Header
