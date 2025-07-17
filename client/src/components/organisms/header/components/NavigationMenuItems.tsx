"use client";
import * as React from "react";
import PLink from "@/components/atoms/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@/hooks/generalHooks";
import HTMLContent from "@/components/atoms/htmlContent";
import { UserProfile } from "@/types/user";
import { Separator } from "@/components/ui/separator";

export function NavigationMenuItems({ user }: { user?: UserProfile }) {
  const posts = useQuery({
    url: "/posts/users",
    key: "posts",
    noRedirect: true,
  });
  const menu = [
    { label: "Give Feedback", link: "/review" },
    { label: "Read Feedback", link: "/dashboard" },
    ...(user?.name
      ? [{ label: "Dispute Management", link: "/disputes/manage" }]
      : []),
    // { label: "Pricing", link: "/pricing" },
    { label: "Contact Us", link: "/contact" },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.slice(0, 2)?.map((m, i) => (
          <NavigationMenuItem key={i}>
            <PLink href={m?.link} className={navigationMenuTriggerStyle()}>
              {m?.label}
            </PLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recent Posts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-lg gap-1 p-2 flex flex-col">
              {posts?.data?.posts?.length ? (
                posts?.data?.posts?.map(
                  (post: Record<string, any>, index: number) => {
                    return (
                      <PLink key={index} href={`/posts/${post?.id}`}>
                        <div className="font-semibold text-foreground">
                          {post.title}
                        </div>
                        <HTMLContent
                          value={post?.body}
                          className="line-clamp-2 !overflow-hidden !p-0"
                        />
                        {index !== posts?.data?.posts?.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </PLink>
                    );
                  }
                )
              ) : (
                <p className="text-center">No data found</p>
              )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {menu.slice(2)?.map((m, i) => (
          <NavigationMenuItem key={i}>
            <PLink href={m?.link} className={navigationMenuTriggerStyle()}>
              {m?.label}
            </PLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
