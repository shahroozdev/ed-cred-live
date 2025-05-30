import React from "react";
import EdCredSection from "./EdCredSection";
import { Header } from "../LandingPage";
import { Footer } from "@/components/organisms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Navbar from "@/components/organisms/header/components/Navbar";

const About = async () => {
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

export default About;
