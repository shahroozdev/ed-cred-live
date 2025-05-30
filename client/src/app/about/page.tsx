import React from "react";
import { Footer } from "@/components/organisms";
import Navbar from "@/components/organisms/header/components/Navbar";
import EdCredSection from "@/components/pages/Aboutus/EdCredSection";
import { Header } from "@/components/pages/LandingPage";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const AboutPage = async () => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });
  return (
    <div className="min-h-screen h-full max-w-screen bg-background relative">
      <Navbar user={user} />
      <Header />
      <EdCredSection />
      <Footer />
    </div>
  );
};
export default AboutPage;
