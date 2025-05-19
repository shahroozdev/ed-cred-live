"use client";
import { Menu } from "lucide-react";
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
import Image from "next/image";
import { NavMain } from "../SideMenu";
import { data } from "../sidebar-data";
import { useState } from "react";

const DrawerBtn = ({ user }: { user: Record<string, any> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="block">
      <Drawer direction="right" open={isOpen}>
        <DrawerTrigger onClick={()=>setIsOpen(!isOpen)}>
          <Menu className="cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent className="bg-background h-screen">
          <DrawerClose className="text-right mr-4 mt-4  cursor-pointer" onClick={()=>setIsOpen(false)}>
            <span className="text-[var(--mt-pre-color)] rounded-full px-2 py-1">X</span>
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
          <NavMain items={user?.role ==="admin"? data?.navMain:data?.navCommon} setIsOpen={setIsOpen}/>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerBtn;
