"use client";

import { useParams, useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {removeAdult, addAdult, removeChild, addChild, removeInfant, addInfant} from "@/app/features/booking/bookingSlice";
import { useUser } from "@clerk/nextjs";

type Props = {
  specialNote?: string;
  price: number;
  discount: number;
  tourId: string;
  userId: string;
  tourName: string;
  className?: React.HTMLAttributes<HTMLDivElement>;
};

export default function BookTourCta({
  specialNote,
  price,
  discount,
  tourId,
  userId,
  tourName,
  className,
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [noOfDays, setNoOfDays] = useState(0);
  const [bookingPrice, setBookingPrice] = useState(price);
  const {user} = useUser();

  const {adultCount, childrenCount, infantCount, guests} = useSelector((store: any)=> store.booking);

  const dispatch = useDispatch();
  
  
  const createBooking = useMutation({
    mutationFn: async () => {
      const startDate = date?.from?.toString();
      const endDate = date?.to ?  date?.to?.toString() : date?.from?.toString();

      const res = await axios.post("/api/bookings", {
        startDate: startDate?.slice(0,15),
        endDate: endDate?.slice(0,15),
        discount,
        adultCount,
        childrenCount,
        infantCount,
        guests,
        noOfDays,
        bookingPrice,
        tourId,
        userId,
        tourName,
      });
      return res.data;
    }
  })
  const router = useRouter();
  const params = useParams();
  const slug = params;

  const discountPrice = price - (price / 100) * discount;

  function handleDateSelect(date: DateRange | undefined){
    setDate(date);
    calculateTotalPrice();
  };

  function calculateNoOfDays(){
    let noOfDays = 0;

    if(date?.from && date?.to){
      noOfDays = (date.to.getTime()) - (date.from.getTime());
      noOfDays = Math.ceil(noOfDays/(24*60*60*1000));
    };

    return noOfDays;
  };


  function calculateTotalPrice(){
    let totalPrice = 0;
    let noOfDays = calculateNoOfDays();

    if (discount !== 0){
      if(noOfDays > 1){
        totalPrice = discountPrice * noOfDays;
        return totalPrice;
      }
      totalPrice = discountPrice;
      return totalPrice;
    }
    if(noOfDays > 1){
      totalPrice = price * noOfDays;
      return totalPrice;
    }
    totalPrice = price;
    return totalPrice;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let noOfDays = calculateNoOfDays();
    let bookingPrice = calculateTotalPrice();
    setNoOfDays(noOfDays);
    setBookingPrice(bookingPrice);
    if(!date){
      toast.error("Please select a date");
      return;
    }
    createBooking.mutate(undefined, {
      onSuccess: ({message}) => {
        console.log("Booking successfully created", {message}),
        createBooking.mutate();
        toast.success("Booking successfully created");
      },
      onError: (error) => {
        console.log("Error creating booking", error);
        toast.error("Error creating booking. Please try again.");
      }
    });
  }
  return (
    <div className="px-4 lg:px-7 py-6">
      <h3>
        <span
          className={`${
            discount !== 0 && "text-muted-foreground"
          } flex flex-col font-bold text-xl`}
        >
          <p>Price: ${calculateTotalPrice()}</p>
        </span>
        {discount !== 0 && (
          <span className="text-red-500 font-bold text-xl">
            {" "}
            | discount {discount}% Now <span>${discountPrice}</span>
          </span>
        )}
      </h3>
      <Separator className="bg-primary my-2" />
      {specialNote && <h4 className="my-8">{specialNote}</h4>}
      <form className="mx-auto w-fit pt-2" onSubmit={handleSubmit}>
        <Label htmlFor="tour dates" className="text-base">
          Tour Dates
        </Label>
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[200px] md:w-[240px] lg:w-[300px] justify-start text-left font-normal overflow-hidden",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="hidden sm:block mr-1 md:mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      <span className="hidden md:block">{format(date.from, "LLL dd, y")} -{" "}</span>
                      <span className="hidden md:block">{format(date.to, "LLL dd, y")}</span>
                      <span className="md:hidden">{format(date.from, "MM/dd/y")} -{" "}</span>
                      <span className="md:hidden">{format(date.to, "MM/dd/y")}</span>
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
            className="w-auto p-0"
            align="center"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Please select your tour dates
        </p>
        <Label htmlFor="first Name" className="text-base">
          First Name
        </Label>
        <Input required defaultValue={user?.firstName || ""} />
        <p className="text-xs text-muted-foreground mb-2">
          Please type in your first name
        </p>
        <Label htmlFor="last Name" className="text-base">
          Last Name
        </Label>
        <Input required defaultValue={user?.lastName || ""} />
        <p className="text-xs text-muted-foreground mb-2">
          Please type in your last name
        </p>
        <Label htmlFor="last Name" className="text-base">
          Email
        </Label>
        <Input required defaultValue={user?.emailAddresses[0].emailAddress || ""} />
        <p className="text-xs text-muted-foreground mb-2">
          Please type in your email
        </p>
        <Label htmlFor="guests" className="relative bottom-1">
          Guests
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-col gap-2 items-start w-full hover:bg-transparent"
            >
              {guests >= 2 ? (
                <p className="text-sm text-foreground font-normal">
                  {guests} Guest(s)
                </p>
              ) : (
                <p className="text-sm text-muted-foreground font-normal">
                  1 Guest
                </p>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[360px]">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="adults" className="flex flex-col gap-2">
                    Adults
                    <p className="text-muted-foreground font-extralight">
                      Ages 13 or above
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (adultCount >= 2) dispatch(removeAdult());
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{adultCount}</p>
                    <Button
                      onClick={() => {
                        dispatch(addAdult())
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="children" className="flex flex-col gap-2">
                    Children
                    <p className="text-muted-foreground font-extralight">
                      Ages 2 - 12
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (childrenCount >= 1) dispatch(removeChild())
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{childrenCount}</p>
                    <Button
                      onClick={() => dispatch(addChild())}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="infants" className="flex flex-col gap-2">
                    Infants
                    <p className="text-muted-foreground font-extralight">
                      Under 2
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (infantCount >= 1) dispatch(removeInfant())
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{infantCount}</p>
                    <Button
                      onClick={() => dispatch(addInfant())}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button
        type="submit"
        className="mt-4"
        disabled={createBooking.isPending}
        >
          {
            createBooking.isPending ? (
              <>
              <Loader2 className="animate-spin mr-2" />
              <span>Creating Booking...</span>
              </>
            ) : (
              <span>Submit</span>
            )
          }
        </Button>
      </form>
    </div>
  );
}
