"use client";
import * as React from "react";
import PLink from "@/components/atoms/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@/hooks/generalHooks";
import HTMLContent from "@/components/atoms/htmlContent";
import { UserProfile } from "@/types/user";

export function NavigationMenuItems({user}:{user?:UserProfile}) {
  const posts = useQuery({
    url: "/posts/users",
    key: "posts",
    noRedirect:true
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <PLink href="/review" className={navigationMenuTriggerStyle()}>
            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              Give Feedback
            {/* </NavigationMenuLink> */}
          </PLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <PLink href="/dashboard" className={navigationMenuTriggerStyle()}>
            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              Read Feedback
            {/* </NavigationMenuLink> */}
          </PLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Recent Posts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-lg gap-1 p-2 flex flex-col">
              {posts?.data?.posts?.length ?
                posts?.data?.posts?.map(
                  (post: Record<string, any>, index: number) => (
                    <PLink key={index} href={`/posts/${post?.id}`}>
                      <div className="font-semibold text-foreground">
                        {post.title}
                      </div>
                      <HTMLContent
                        value={post?.body}
                        className="line-clamp-2 !overflow-hidden !p-0"
                      />
                    </PLink>
                  )
                ):<p className="text-center">No data found</p>}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {user?.name&&<NavigationMenuItem>
          <PLink href="/disputes/manage" className={navigationMenuTriggerStyle()}>
            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              Dispute Management
            {/* </NavigationMenuLink> */}
          </PLink>
        </NavigationMenuItem>}
        <NavigationMenuItem>
          <PLink href="/contact" className={navigationMenuTriggerStyle()}>
            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              Contact Us
            {/* </NavigationMenuLink> */}
          </PLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

