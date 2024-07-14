"use client";

import { Separator } from "./ui/separator";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
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
import {
  removeAdult,
  addAdult,
  removeChild,
  addChild,
  removeInfant,
  addInfant,
} from "@/app/features/booking/bookingSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

type Props = {
  specialNote?: string;
  price: number;
  discount: number;
  activityId: string;
  userId: string;
  activityName: string;
  className?: React.HTMLAttributes<HTMLDivElement>;
};

export default function BookActivityCta({
  specialNote,
  price,
  discount,
  activityId,
  userId,
  activityName,
  className,
}: Props) {
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookingPrice, setBookingPrice] = useState(price);
  const { user } = useUser();
  const router = useRouter();

  const { adultCount, childrenCount, infantCount, guests } = useSelector(
    (store: any) => store.booking
  );

  const dispatch = useDispatch();

  const createBooking = useMutation({
    mutationFn: async () => {
      if (!dates?.to) {
        toast.error("Please select an end date date");
        return;
      }
      const res = await axios.post("/api/bookings", {
        startDate:
          activityName === "Volunteering"
            ? dates?.from?.toDateString().slice(0, 15)
            : date?.toDateString().slice(0, 15),
        endDate:
          activityName === "Volunteering"
            ? dates?.to?.toDateString().slice(0, 15)
            : addDays(date!, 7).toDateString().slice(0, 15),
        discount,
        adultCount,
        childrenCount,
        infantCount,
        guests,
        noOfDays: activityName === "Volunteering" ? 5 : 7,
        bookingPrice,
        activityId,
        userId,
        activityName,
      });
      return res.data;
    },
  });

  function calculateDiscountPrice() {
    let discPrice = 0;
    const discountPrice = price - (price / 100) * discount;
    let sub = discountPrice / 3;
    if (guests === 1) {
      discPrice = discountPrice;
    } else if (guests === 2) {
      discPrice = discountPrice - sub;
    } else if (guests >= 3 && guests <= 8) {
      discPrice = discountPrice - (sub + sub * (1.66 * (guests / 10)));
    } else if (guests > 8) {
      discPrice = discountPrice - (sub + sub * (1.66 * (8 / 10)));
    }

    return parseFloat(discPrice.toFixed(2));
  }

  function calculateTotalPrice() {
    let totalPrice = 0;
    let sub = price / 3;
    if (guests === 1) {
      totalPrice = price;
    } else if (guests === 2) {
      totalPrice = price - sub;
    } else if (guests >= 3 && guests <= 8) {
      totalPrice = price - (sub + sub * (1.66 * (guests / 10)));
    } else if (guests > 8) {
      totalPrice = price - (sub + sub * (1.66 * (8 / 10)));
    }

    return parseFloat(totalPrice.toFixed(2));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (discount !== 0) {
      setBookingPrice(calculateDiscountPrice());
    } else {
      setBookingPrice(calculateTotalPrice());
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    createBooking.mutate(undefined, {
      onSuccess: ({ message }) => {
        console.log("Booking successfully created", { message }),
          toast.success("Booking successfully created");
        router.refresh();
      },
      onError: (error) => {
        console.log("Error creating booking", error);
        toast.error("Error creating booking. Please try again.");
      },
    });
  }
  return (
    <div className="px-4 lg:px-7 py-6">
      <h3>
        <span
          className={`${
            discount !== 0 && "text-green-700 dark:text-green-600"
          } flex flex-col font-bold text-lg md:text-xl`}
        >
          Book a Trip
        </span>
      </h3>
      <Separator className="bg-primary my-2" />
      {specialNote && <h4 className="my-8">{specialNote}</h4>}
      <form className="mx-auto w-fit pt-2" onSubmit={handleSubmit}>
        <Label htmlFor="activity dates" className="text-base">
          {activityName === "Volunteering" ? <>Dates</> : <>Date</>}
        </Label>
        <div className={cn("grid gap-2", className)}>
          {activityName === "Volunteering" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dates?.from ? (
                    dates.to ? (
                      <>
                        {format(dates.from, "LLL dd, y")} -{" "}
                        {format(dates.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dates.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dates?.from}
                  selected={dates}
                  onSelect={setDates}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          ) : (
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
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Please select your activity date
          {activityName === "Volunteering" && <>s</>}
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
        <Input
          required
          defaultValue={user?.emailAddresses[0].emailAddress || ""}
        />
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
                        if (adultCount >= 2) {
                          dispatch(removeAdult());
                          calculateTotalPrice();
                          calculateDiscountPrice();
                        }
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{adultCount}</p>
                    <Button
                      onClick={() => {
                        dispatch(addAdult());
                        calculateTotalPrice();
                        calculateDiscountPrice();
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
                        if (childrenCount >= 1) {
                          dispatch(removeChild());
                          calculateTotalPrice();
                          calculateDiscountPrice();
                        }
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{childrenCount}</p>
                    <Button
                      onClick={() => {
                        dispatch(addChild());
                        calculateTotalPrice();
                        calculateDiscountPrice();
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
                  <Label htmlFor="infants" className="flex flex-col gap-2">
                    Infants
                    <p className="text-muted-foreground font-extralight">
                      Under 2
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (infantCount >= 1) {
                          dispatch(removeInfant());
                          calculateTotalPrice();
                          calculateDiscountPrice();
                        }
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{infantCount}</p>
                    <Button
                      onClick={() => {
                        dispatch(addInfant());
                        calculateTotalPrice();
                        calculateDiscountPrice();
                      }}
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
          {createBooking.isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              <span>Creating Booking...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </div>
  );
}
