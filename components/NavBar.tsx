"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeButton from "./DarkModeButton";
import { forwardRef } from "react";

export default function Navbar({ className }: { className?: string }) {
  const {userId} = useAuth();
  return (
    <div
      className={cn("fixed top-3 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <nav className="relative rounded-full border border-transparent bg-card dark:bg-background shadow dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 ">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/main/home" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/main/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
              <Link href="/main/tours" legacyBehavior passHref>
                  Tours
              </Link>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/main/gallery" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Gallery
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <SignedIn>
            <NavigationMenuItem>
            <Link href={`/main/user/${userId}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  User Page
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            </SignedIn>
            <NavigationMenuItem>
              <Link href="/main/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <SignedOut>
            <NavigationMenuItem>
                <Button variant={"ghost"}>
                    <Link
                    href="/sign-in"
                    className="w-full text-foreground"
                    >
                    Sign In
                    </Link>
                    </Button>
            </NavigationMenuItem>
            </SignedOut>
            <SignedIn>
            <NavigationMenuItem>
                <Button variant={"link"}
                >
                <UserButton/>
                </Button>
            </NavigationMenuItem>
            </SignedIn>
            <DarkModeButton/>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
