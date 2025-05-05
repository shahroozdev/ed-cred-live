import Footer from '@/components/Landing/Footer';
import Header from '@/components/Common/Header';
import Navbar from '@/components/Landing/Navbar';
import WebsitePolicy from '@/components/WebPolicy/WebPolicy';
import React from 'react';

const WebUsePolicyPage = () => {
    return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <Header
                title='Ed-Cred Website Use Policy'
                description='Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.'
                />
            <WebsitePolicy/>
            <Footer/>
        </div>
    )
}

export default WebUsePolicyPage;
