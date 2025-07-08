"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  User2,
  type LucideIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { data } from "./sidebar-data";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PLink from "@/components/atoms/link";
import { Dispatch, SetStateAction } from "react";

export const SideMenu = ({user}:{user?:Record<string, any>}) => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar className="font-inter !bg-white" collapsible="icon">
      <SidebarHeader className="relative overflow-auto">
        <SidebarMenu>
          <SidebarMenuItem className="my-2">
            <SidebarMenuButton>
              <Image
                src={"/logo.png"}
                width={100}
                height={200}
                className="w-10 h-auto"
                alt="logo"
              />
              <div className="font-semibold text-lg">Ed Cred</div>
            </SidebarMenuButton>
            <div onClick={toggleSidebar} className="absolute right-0 top-0">
              {open ? (
                <ChevronLeft
                  className="bg-green-600 rounded-full !h-10 !w-10 text-white !absolute right-0 cursor-pointer z-50 "
                  onClick={toggleSidebar}
                />
              ) : (
                <ChevronRight
                  className="bg-green-600 rounded-full !h-10 !w-10 text-white ml-1"
                  onClick={toggleSidebar}
                />
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role==="super_admin"?data?.navSuperMain:data?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export function NavMain({
  items, setIsOpen,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[],  setIsOpen?:Dispatch<SetStateAction<boolean>>
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((item, idx) => (
          <Collapsible
            key={idx}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  {item.items ? (
                    <>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </>
                  ) : (
                    <span onClick={()=>setIsOpen&&setIsOpen(false)}>
                      <PLink href={item.url}>{item.title}</PLink>
                    </span>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <PLink href={`${item.url}${subItem.url}`}>
                          <span onClick={()=>setIsOpen&&setIsOpen(false)}>{subItem.title}</span>
                        </PLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
