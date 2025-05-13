"use client";
import About from "@/components/Landing/About";
import Categories from "@/components/Landing/Categories";
import Feedbacks from "@/components/Landing/RecentFeedbacks";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
// import Metrics from '@/components/Landing/Metrics';
import Dissussions from "@/components/Landing/RecentDisscussions";
import Navbar from "@/components/Landing/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen h-full bg-background relative">
      <Navbar />
      <Header />
      <Categories />
      <About />
      {/* <Metrics /> */}
      <Feedbacks />
      <Dissussions />
      <Footer />
    </div>
  );
};

export default HomePage;
