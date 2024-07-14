"use client";

import { clearCount } from "@/app/features/booking/bookingSlice";
import ActivityWobbleCard from "@/components/ActivityWobbleCard";
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { Activities } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activities[]>([]);
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

  const fetchActivities = useMutation({
    mutationFn: async ()=>{
      const resp = await axios.post("/api/activities");
      const activities = resp.data;
      setActivities(activities);
      return activities;
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
      setActivities(resp.data);
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
      fetchActivities.mutate(undefined, {
        onSuccess: (data)=>{
          console.log("Data fetched", data);
          fetchActivities.mutate();
        },
        onError(error){
          console.log("Error", error);
        }
      })
    },[]);

  return (
    <div>
      <ImageSlider textp1={"Crafting unforgettable journeys into the soul of Africa"} textp2={"with the Best of Africa Safaris."}/>
      <div className="mt-10 md:mt-20">
      <div className="flex flex-col justify-center items-center w-3/4 gap-3 mx-auto font-chillax my-20 my:mb-40">
        <h3 className="text-black/60 dark:text-white/60 text-base">SEARCH</h3>
        <h2 className="text-center text-3xl md:text-5xl">
          <span className="font-semibold">AVAILABLE</span> ACTIVITIES
        </h2>
        <SearchBar onSubmit={handleSubmit} isPending={search.isPending} setDate={setDate} date={date} />
      </div>
        <Separator className="mt-20"/>
        <div className="flex flex-row flex-wrap gap-5 mx-auto justify-center my-20">
          {activities?.map((activity: any, index: number) => (
            <ActivityWobbleCard key={index} activity={activity} isLoading={fetchActivities.isPending}/>
          ))}
        </div>
      </div>
    </div>
  );
};