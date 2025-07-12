import React from "react";
import { Footer } from "@/components/organisms";
import Navbar from "@/components/organisms/header/components/Navbar";
import EdCredSection from "@/components/pages/Aboutus/EdCredSection";
import { Header } from "@/components/pages/LandingPage";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Image from "next/image";

const AboutPage = async () => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
    noRedirect: true,
  });
  return (
    <div className="min-h-screen h-full max-w-screen bg-background relative">
      <Navbar user={user} />
      <Header />
      <div className="max-w-[1400px] w-full h-full mx-auto p-6 md:px-12 bg-background">
        <div className=" flex flex-col lg:flex-row items-start md:items-center gap-10">
          {/* Text Section */}
          <div className="lg:w-2/3 text-[var(--mt-pre-color)]">
            <h4 className="text-2xl font-semibold my-3">Vision</h4>
            <p className="mb-4">
              <b className="text-white font-bold">
                Transparency and accountability are the keys to our children's
                education and safety.
              </b>
              Ed-Cred exists to ensure every voice is heard and every school is
              held to a higher standard—because our kids deserve nothing less.
            </p>
            <h4 className="text-2xl font-semibold my-3">Mission</h4>
            <p className="mb-4 ">
              To empower families, educators, school staff members, and school
              leaders to share real, verified experiences—building trust,
              exposing injustice, and creating safer, stronger schools for all.
            </p>
            <h4 className="text-2xl font-semibold my-3">Core Values</h4>
            <ul className="list-disc pl-6 space-y-2 ">
              <li>Transparency</li>
              <p>
                We believe in open, honest feedback that brings clarity to
                school communities.
              </p>
              <li>Accountability</li>
              <p>
                We hold schools, educators, and systems to the standards our
                children deserve.
              </p>
              <li>Safety</li>
              <p>
                A safe learning environment—emotionally, physically, and
                socially—is non-negotiable.
              </p>
              <li>Voice</li>
              <p>
                {" "}
                Every story counts. Every perspective matters. Together, they
                build the full picture.
              </p>
              <li>Equity</li>
              <p>
                We stand for fair treatment, access, and opportunity for every
                child—regardless of background.
              </p>
            </ul>
          </div>

          {/* Image Section */}
          <div className="min-h-[450px] relative flex justify-center lg:bottom-20 ">
            {/* Larger Image */}
            <div className="relative w-56 h-56 md:w-55 md:h-55 -right-20">
              <Image
                src="/images/4.png"
                alt="Educational setting"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl border-7 border-solid border-white shadow-lg"
              />
            </div>

            {/* Overlapping Smaller Image */}
            <div className="absolute w-50 h-60 top-28 md:top-40 ">
              <Image
                src="/images/6.png"
                alt="Learning environment"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl border-7 border-solid border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AboutPage;
