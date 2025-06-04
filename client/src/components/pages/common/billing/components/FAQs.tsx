import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React from "react";
import { faqs } from "./data";
import CustomAccordion from "@/components/atoms/accordian";

const FAQs = () => {
  return (
    <>
      <div className="flex items-start flex-col my-10 p-4">
        <div className="md:text-7xl text-3xl font-semibold">FAQ's</div>
        <div className="md:text-2xl text-lg font-normal">
          Frequenty asked questions <br /> Ed-Cred is Safe and Authentic
        </div>
      </div>
       <CustomAccordion
          items={faqs.map((q)=>({title:<p className="md:text-lg text-base font-semibold">{q.title}</p>, desc:<p className="text-base px-4 opacity-90">{q.desc}</p>}))}
          className=" border-b-2 border-b-muted mb-2 transition-all duration-300 ease-in-out space-y-3 mx-4"
        />
    </>
  );
};

export default FAQs;
