"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useAuth, UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeButton from "./DarkModeButton";


const MobileNav = () => {
    const { user } = useUser();
    const {userId} = useAuth();
    const {signOut} = useClerk();

    return (
        <Sheet>
            <SheetTrigger className="md:hidden sticky top-1 z-20 left-[90vw] sm:left-[96vw]">
                <Menu className="text-primary" />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className="flex flex-col mt-5 px-3">
                    <SignedIn>
                        <p className="text-green-800 dark:text-primary">{user?.fullName}</p>
                    </SignedIn>
                    <SignedOut>
                        <p className="font-black text-green-800 dark:text-primary">Welcome to The Best of Africa Safaris</p>
                    </SignedOut>
                    <DarkModeButton/>
                </SheetTitle>
                <Separator className="my-3" />
                <SheetDescription className="flex">
                        <div className="flex flex-col gap-3 mt-1 text-base">
                            <Link href={"/main/home"} className="font-semibold hover:text-primary">
                                Home
                            </Link>
                            <Link href={"/main/about"} className="font-semibold hover:text-primary">
                                About
                            </Link>
                             <Link href="/main/tours" className="font-semibold hover:text-primary">
                                    Tours
                                </Link>
                                <Link href="/main/gallery" className="font-semibold hover:text-primary">
                                    Gallery
                                </Link>
                            <SignedIn>
                            <Link href={`/main/users/${userId}`} className="font-semibold hover:text-primary">
                                User Page
                            </Link>
                            </SignedIn>
                            <Link href="/main/contact" className="font-semibold hover:text-primary">
                                Contact
                            </Link>
                            <SignedOut>
                            <Link href="/sign-in" className="font-semibold hover:text-primary">
                                Sign In
                            </Link>
                            </SignedOut>
                            <SignedIn>
                            <h1
                            onClick={() => signOut()}
                            className="font-semibold hover:text-primary"
                            >
                                Sign Out
                            </h1>
                            </SignedIn>
                        </div>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav