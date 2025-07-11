import Image from "next/image";
import React from "react";
import {
  ArrowRightIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "@/components/atoms";
import PLink from "@/components/atoms/link";

const Footer = () => {
  const date = new Date();
  const Links = [
    {
      head: "Submit a Review",
      link: "/submission-guidlines",
    },
    {
      head: "Review Guidelines",
      link: "/review-guidlines",
    },
    {
      head: "Dispute a Review",
      link: "/dispute-guidlines",
    },
    {
      head: "Terms of Use",
      link: "/terms-of-use",
    },
    {
      head: "Privacy Policy",
      link: "/web-use-policy",
    },
    {
      head: "Contact us",
      link: "/contact",
    },
  ];

  return (
    <div className="bg-[#1B201E] w-screen">
      <div className="grid grid-cols-1 gap-10 p-10 max-w-[1400px] m-auto pt-20 font-[400] text-white md:grid-cols-5">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt="ed-cred-logo"
            />
            <p className="font-semibold text-4xl opacity-90">Ed-Cred</p>
          </div>
          <div className="opacity-85 font-thin">
            Ed-Cred is a trusted review platform empowering educators, parents,
            school staff, and leadership to share verified experiences and
            promote accountability in schools. Together, we work to ensure safe,
            inclusive, and high-quality education for all students.
          </div>
          <PLink
            href={"/about"}
            className="text-primary hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Learn More →
          </PLink>
        </div>
        <div className="flex flex-col gap-4 text-[400]">
          <div className="text-2xl font-[700]">Quick Links</div>
          {Links.map((item, index) => (
            <PLink
              key={index}
              href={item.link}
              className="opacity-75 font-light hover:text-primary hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {item.head}
            </PLink>
          ))}
        </div>
        <div className="grid grid-row gap-4 col-span-2">
          <div className="flex flex-col gap-4 text-[400]">
            <div className="text-2xl font-[700]">Mission & Values</div>
            <div className="opacity-85 font-thin">
              Transparency. Accountability. Safety. Equity. Voice. We believe
              every student deserves an educational environment built on trust,
              fairness, and continuous growth.
            </div>
            <PLink
              href={"/our-mission"}
              className="text-primary hover:scale-105 transition-all duration-300 ease-in-out"
            >
              View Our Full Mission →
            </PLink>
          </div>
          <div className="flex flex-col gap-4 text-[400]">
            <div className="text-2xl font-[700]">Legal & Trust</div>
            <div className="opacity-85 font-thin">
              Ed-Cred operates under U.S. legal protections, including CDA
              Section 230 and Anti-SLAPP safeguards. All reviews are anonymous.
              Verified claims receive a Verified Stamp and are securely
              moderated for accuracy and fairness.
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-4 md:col-span-2 items-center">
          <div className="text-2xl font-[700]">Try It Today</div>
          <div className="text-[400]">
            Get started for free. Add your whole team as your needs grow.
          </div>
          <div>
            <Button variant="primary">
              <div className="flex gap-2 text-xl items-center">
                <div>Join Now</div>
                <ArrowRightIcon />
              </div>
            </Button>
          </div>
        </div> */}
        <div className="border-t-2 border-[#2E4E73] pt-4 md:col-span-5">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p>
              Copyright &#169; {date?.getFullYear()} Ed-Cred. All Rights
              Reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="https://www.facebook.com/profile.php?id=61573691075986 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon fill="white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon fill="white" />
              </a>
              <a
                href="https://www.linkedin.com/company/ed-cred"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon fill="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
