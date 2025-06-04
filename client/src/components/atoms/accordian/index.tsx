'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode, useState } from "react";

interface Props {
  items: { title: ReactNode; desc: ReactNode }[];
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  className?:string
}
const CustomAccordion = ({ items, closeIcon, openIcon, className }: Props) => {
    const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <Accordion type="single" collapsible onValueChange={(value) => setOpenItem(value)}>
      {items?.map(
        (item: { title: ReactNode; desc: ReactNode }, idx: number) => {
            const isOpen = openItem === String(idx);
          return (
            <AccordionItem key={idx} value={String(idx)} className={className}>
              <AccordionTrigger hideIcon={!!openIcon}>
              <div className="flex items-center justify-between w-full cursor-pointer">
              <span>{item?.title}</span>
              {isOpen ? openIcon : closeIcon} {/* Dynamic Icon Change */}
              </div>
              </AccordionTrigger>
              <AccordionContent>{item?.desc}</AccordionContent>
            </AccordionItem>
          );
        }
      )}
    </Accordion>
  );
};

export default CustomAccordion;
