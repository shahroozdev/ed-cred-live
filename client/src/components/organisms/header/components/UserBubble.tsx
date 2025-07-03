'use client'
import { removeCookie } from "@/actions/serverActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePRouter } from "@/hooks/useRouter";
import { UserProfile } from "@/types/user";
import Image from "next/image";

export const UserBubble = ({ user }: { user: UserProfile }) => {
  const router = usePRouter();
  async function logout() {
    localStorage.removeItem("token");
    await removeCookie("user");
    await removeCookie("token");
    router.push("/");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center gap-4 hover:bg-muted-foreground/10 transition-colors px-3 rounded-md py-1">
          <div suppressHydrationWarning className="w-8 h-8 bg-muted-foreground text-white font-semibold rounded-full flex items-center justify-center">
            {user?.profilePictureUrl ? (
              <Image
                src={process.env.BASE_URL + user?.profilePictureUrl}
                width={500}
                height={500}
                alt={`${user?.name} | ED-Cred`}
                className="w-full h-full rounded-full"
              />
            ) : (
              user?.name?.slice(0, 2)
            )}
          </div>
          <div className="capitalize text-base">{user?.name?.split(" ")}</div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-medium leading-none capitalize">
              {user?.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                user?.role === "admin" ? "admin-dashboard" : "/dashboard"
              )
            }
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
