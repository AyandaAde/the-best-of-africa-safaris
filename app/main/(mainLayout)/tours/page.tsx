"use client";

import { clearCount } from "@/app/features/booking/bookingSlice";
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";
import TourWobbleCard from "@/components/TourWobbleCard";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db/prisma";
import { Tours } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ToursPage() {
  const [tours, setTours] = useState<Tours[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const {adultCount, childrenCount, infantCount, guests} = useSelector(
    (store: any) => store.booking
  );
  const {searchQuery} = useSelector(
    (store: any) => store.search
  );

  const dispatch = useDispatch();


  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
  ];
  const fetchTours = useMutation({
    mutationFn: async ()=>{
      const resp = await axios.post("/api/tours");
      const tours = resp.data;
      setTours(tours);
      return tours;
    }
  });

  const search = useMutation({
    mutationFn: async () => {
      const startDate = date?.from;
      const endDate = date?.to;
      console.log(startDate, endDate);
      const resp = await axios.post("/api/search", {
        searchQuery,
        adultCount,
        childrenCount,
        infantCount,
        guests,
        startDate,
        endDate,
      });

      console.log(resp.data);
      setTours(resp.data);
      return resp.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && guests) {
      search.mutate(undefined, {
        onSuccess: (data) => {
          console.log("new search query created", { data });
          search.mutate();
        },
        onError: (error) => {
          console.log("search query error", { error });
          toast.error("Error creating search query. Please try again.");
        },
      });
    } else if (!date) toast.error("Please select a date.");
    else if (guests === 0) toast.error("Please select number of guests.");
    dispatch(clearCount());
  };

    useEffect(()=>{
      fetchTours.mutate(undefined, {
        onSuccess: (data)=>{
          console.log("Data fetched", data);
          fetchTours.mutate();
        },
        onError(error){
          console.log("Error", error);
        }
      })
    },[]);

  return (
    <div>
      <ImageSlider images={images} textp1={"Crafting unforgettable journeys into the soul of Africa"} textp2={"with the Best of Africa Safaris."}/>
      <div className="mt-10 md:mt-20">
      <div className="flex flex-col justify-center items-center w-3/4 gap-3 mx-auto font-chillax my-20 my:mb-40">
        <h3 className="text-black/60 dark:text-white/60 text-base">SEARCH</h3>
        <h2 className="text-center text-3xl md:text-5xl">
          <span className="font-semibold">AVAILABLE</span> TOURS
        </h2>
        <SearchBar onSubmit={handleSubmit} isPending={search.isPending} setDate={setDate} date={date} />
      </div>
        <Separator className="mt-20"/>
        <div className="flex flex-row flex-wrap gap-5 mx-auto justify-center my-20">
          {tours?.map((tour: any, index: number) => (
            <TourWobbleCard key={index} tour={tour} isLoading={fetchTours.isPending}/>
          ))}
        </div>
      </div>
    </div>
  );
};