"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRef } from "react";
import { ThemeToggle } from "@/components/atoms/themeToggle/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { removeCookie } from "@/actions/serverActions";
import { UserBubble } from "./UserBubble";
import DrawerBtn from "../../sidebar/mobileSidebar";

export const AdminNavbar = ({ user }: { user: any }) => {
  return (
    <div className="bg-background sticky top-0 z-10 border-b max-w-screen">
      <div className="flex h-16 items-center px-4 ">
        {/* <MainNav className="mx-2" /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Search />
          <UserBubble user={user} />
          <div className="md:hidden block"><DrawerBtn user={user} /></div>
        </div>
      </div>
    </div>
  );
};

export function UserNav({ user: profile }: { user: Record<any, any> }) {
  const router = useRouter();
  const logoutAndRedirect = async () => {
    localStorage.removeItem("token");
    await removeCookie("user");
    await removeCookie("token");
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{profile?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {profile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutAndRedirect}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/feedback", label: "Feedback" },
    { href: "/feedback/create", label: "Create Feedback" },
    { href: "/forum", label: "Forum" },
    { href: "/users", label: "Manage users" },
    { href: "/review/", label: "Review" },
    { href: "/posts", label: "Posts" },
    { href: "/category", label: "Categories" },
    { href: "/subcategory", label: "SubCategories" },
    { href: "/settings", label: "Settings" },
  ];

  const scroll = (offset: number) => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Left arrow */}
      <button
        onClick={() => scroll(-100)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scrollable nav */}
      <nav
        ref={navRef}
        {...props}
        className="overflow-x-auto scrollbar-none flex items-center space-x-4 lg:space-x-6 px-6"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "whitespace-nowrap text-sm font-medium transition-colors",
              pathname === href
                ? "text-foreground"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right arrow */}
      <button
        onClick={() => scroll(100)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default MainNav;

// TODO: connect it with the backend
function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
