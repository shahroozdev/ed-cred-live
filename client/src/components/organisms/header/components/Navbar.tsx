"use client";
import Image from "next/image";
import { NavigationMenuItems } from "./NavigationMenuItems";
import LoginRegistrationModal from "./loginRegistrationModal";
import { UserBubble } from "./UserBubble";
import { UserProfile } from "@/types/user";
import DrawerBtn from "../../sidebar/mobileSidebar";
import { ThemeToggle } from "@/components/atoms/themeToggle/ThemeToggle";
import PLink from "@/components/atoms/link";


const Navbar = ({ user }: { user: UserProfile }) => {
  // console.log(user)
  return (
    <div className="!sticky !top-0 left-0 flex h-[70px] w-full items-center justify-center bg-background border-b-[1px] border-muted border-solid  shadow-md sm:px-8 px-2 z-10 text-[var(--mt-pre-color)]">
      <div className="w-full flex items-center justify-between py-4">
        <PLink href={'/'} className="flex items-center justify-center gap-2 md:gap-4 cursor-pointer">
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="ed-cred logo"
            className="w-8 md:w-[50px]"
          />
          <div className="sm:text-lg text-base font-[500] md:text-2xl">Ed-Cred</div>
        </PLink>

        <div className="flex items-center sm:gap-4 gap-2">
          {/* <MenuList/> */}
          <div className="lg:block hidden">
            <NavigationMenuItems user={user}
            // userCategoryId={user && user?.category ? user.category.id : 0}
            />
          </div>
          {/* <ThemeToggle /> */}
          {user?.name ? (
            <UserBubble user={user} />
          ) : (
            <div className="flex gap-2 md:gap-4">
              <LoginRegistrationModal />
            </div>
          )}
          <div className="lg:hidden block"><DrawerBtn user={user} /></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
