"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchComp from "./ui/search-comp";
import MobileSearchComp from "./ui/mobile-search-form";

export default function SearchBar() {
  const placeholders = [
    "Serengeti",
    "Ngorongoro Crater",
    "Manyara National Park",
    "Kilimanjaro",
  ];

  return (
    <div className="w-fit flex flex-row items-center bg-card dark:bg-zinc-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] mx-auto rounded-full">
      <SearchComp placeholders={placeholders} />
      <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"outline"}
                className="rounded-full h-12 w-full flex flex-row gap-3 items-start"
              >
                <SearchIcon />
                <div className="flex flex-col items-start">
                  <Label htmlFor="tour">Which Tour?</Label>
                  <p className="text-sm text-muted-foreground">
                    Tour ∙ Any Day ∙ Add Guests
                  </p>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side={"top"} className="pt-20 h-screen w-screen overflow-x-hidden overflow-y-scroll">
              <SheetHeader>
                <SheetTitle className="text-center">Which tour would you like to take today?</SheetTitle>
              </SheetHeader>
              <MobileSearchComp placeholders={placeholders}/>
            </SheetContent>
          </Sheet>

      </div>
    </div>
  );
}
