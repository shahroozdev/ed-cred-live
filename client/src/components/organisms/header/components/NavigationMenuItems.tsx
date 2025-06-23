"use client";
import * as React from "react";
import Link from "next/link";
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

export function NavigationMenuItems() {
  const posts = useQuery({
    url: "/posts",
    key: "posts",
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/review" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Give Feedback
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Read Feedback
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Recent Posts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-lg gap-1 p-2 flex flex-col">
              {posts &&
                posts?.data?.posts?.map(
                  (post: Record<string, any>, index: number) => (
                    <ListItem key={index} href={`/posts/${post?.id}`}>
                      <div className="font-semibold text-foreground">
                        {post.title}
                      </div>
                      <HTMLContent
                        value={post?.body}
                        className="line-clamp-2 !overflow-hidden !p-0"
                      />
                    </ListItem>
                  )
                )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </div>
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";
