import { Header, Footer } from "@/components/organisms";
import Image from "next/image";
import React from "react";
import PLink from "@/components/atoms/link";
import GoBackBtn from "@/components/atoms/goback";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const NotFound = async () => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
    noRedirect: true,
  });
  return (
    <main className="flex flex-col">
      <Header user={user} />
      <section className="max-w-7xl mx-auto mb-5 flex flex-col justify-center items-center text-center px-4">
        <div className="relative w-full h-54 sm:h-80 md:h-96 ">
          <Image
            src="/images/errorImage/notFound.png"
            alt="Not Found"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-5xl sm:text-6xl lg:text-8xl font-bold">404</p>
          <p className="text-md sm:text-xl lg:text-2xl font-medium">
            Not Found
          </p>
        </div>
        <div className="flex gap-2.5">
          <GoBackBtn />
          <PLink
            href={user.role === "user" ? "/dashboard" : "admin-dashboard"}
            className="hover:bg-primary bg-white text-md hover:text-white text-primary font-normal border-2 border-primary p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer"
          >
            Go to Dashboard
          </PLink>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
