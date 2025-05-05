"use client";
import About from '@/components/Landing/About';
import Categories from '@/components/Landing/Categories';
import Feedbacks from '@/components/Landing/RecentFeedbacks';
import Footer from '@/components/Landing/Footer';
import Header from '@/components/Landing/Header';
// import Metrics from '@/components/Landing/Metrics';
import Navbar from '@/components/Landing/Navbar';
import Dissussions from '@/components/Landing/RecentDisscussions';

const HomePage = () => {
    return (
        <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden pt-10 md:pt-20 bg-white text-black">
            <Navbar />
            <Header />
            <Categories />
            <About />
            {/* <Metrics /> */}
            <Feedbacks />
            <Dissussions />
            <Footer />
        </main>
    );
}

export default HomePage;
