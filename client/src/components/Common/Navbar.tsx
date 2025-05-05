"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useEffect } from "react";
import { logout } from "@/api/auth";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/loader";

export const Navbar = () => {
    return (
        <div className="bg-background sticky top-0 z-50 border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <Search />
                    <UserNav />
                </div>
            </div>
        </div>
    )
}

export function UserNav() {

    const { user: profile } = useUserProfile();

    useEffect(() => {
        if (profile && profile.role !== "admin") {
            router.replace("/");
        }
    }, [profile]);

    const router = useRouter();

    const logoutAndRedirect = () => {
        logout();
        router.push("/");
    }

    if (!profile) {
        return <Loader />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
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
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutAndRedirect}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

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

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {links.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "hover:text-primary text-sm font-medium transition-colors",
                        pathname === href ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
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
    )
}
