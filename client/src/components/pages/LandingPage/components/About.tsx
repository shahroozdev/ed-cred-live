import { Button } from "@/components/atoms";
import PLink from "@/components/atoms/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="my-20 flex flex-col lg:items-start items-center justify-center gap-20 max-w-[1400px] md:px-10 px-4 m-auto font-[400] w-full lg:flex-row">
      <div className="flex flex-col items-center gap-8 md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="w-max rounded-full bg-[#A1AF001A] px-4 py-2 font-sans text-xs font-[400] tracking-widest text-[#439E5E] md:text-sm">
            WHO WE ARE
          </div>
          <div className="text-4xl">What we do</div>
        </div>
        <div className="px-10 text-center text-base text-pretty md:px-0 md:text-left md:text-xl">
          Ed-Cred is a platform dedicated to fostering transparency and
          accountability in education. We provide a space for honest, anonymous
          reviews of educators, schools, and institutions. Our mission is to
          empower the education community by sharing insights that help
          educators, leaders, and school staff grow and improve. Join us in
          creating a more informed and collaborative educational experience for
          all.
        </div>
        <div>
          <PLink href={"/about"} className="bg-primary text-white p-2 rounded-lg border-2 border-primary border-solid hover:bg-white hover:text-primary">Read More About Us</PLink>
        </div>
      </div>
      {/* <Image src={'/icons/about-image.png'} width={900} height={800} alt="about-image" className="w-80 md:w-auto" /> */}
      <div className="flex gap-4 !min-w-1/3 md:w-auto"> 
        {/* Left shorter image */}
        <div className="rounded-xl overflow-hidden w-1/2 h-[300px] relative">
          <Image
            src="/images/3.jpg"
            alt="People collaborating"
            width={900} height={800}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right taller image */}
        <div className="rounded-xl overflow-hidden w-1/2 h-[400px] relative">
          <Image
            src="/images/5.png"
            alt="3D abstract visual"
            width={900} height={800}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
