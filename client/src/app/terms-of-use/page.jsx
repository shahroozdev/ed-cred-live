import React from 'react';
import Header from '@/components/Common/Header';
import Footer from '@/components/Landing/Footer';
import TermsOFUse from '@/components/Termsofuse/TermsOfUse';
import Navbar from '@/components/Landing/Navbar';

const TermsOfUsePage = () => {
    return (
        <>
            <Navbar />
            <Header
                title='Terms Of Use'
                description='Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.'
            />
            <TermsOFUse/>
            <Footer/>
        </>
    )
}

export default TermsOfUsePage;
