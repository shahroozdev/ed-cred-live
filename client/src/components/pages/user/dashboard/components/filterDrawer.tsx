"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterXIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FilterForm from "./filterForm";

const FilterDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="block">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger onClick={() => setIsOpen(!isOpen)}>
          <div className="bg-gray-100 flex gap-2 px-4 py-1 rounded-lg text-black cursor-pointer">
            Filters: <FilterXIcon stroke="black" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-background h-screen">
          <DrawerClose
            className="text-right mr-4 mt-4  cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-[var(--mt-pre-color)] rounded-full px-2 py-1">
              X
            </span>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
                <Image
                  src="/images/logo.png"
                  width={150}
                  height={150}
                  alt="ed-cred logo"
                  className="w-24 "
                />
                <div className="text-lg font-[500] md:text-2xl">Ed-Cred</div>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <FilterForm setIsOpen={setIsOpen}/>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
