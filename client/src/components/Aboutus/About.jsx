import React from 'react';
import Header from '@/components/Landing/Header';
import EdCredSection from './EdCredSection';
import Footer from '@/components/Landing/Footer';
import Navbar from '@/components/Landing/Navbar';

const About = () => {
    return (
        <div className='w-full h-auto p-0 m-0 overflow-x-hidden bg-white'>
            <Navbar />
            <Header
                title='About Us'
                description='Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.'
            />
            <EdCredSection/>
            <Footer/>
        </div>
    )
}

export default About;
