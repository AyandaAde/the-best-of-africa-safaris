"use client";

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookmarkFilledIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { BanknoteIcon, Loader2, StarIcon } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { sortBy } from 'lodash';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Textarea2 } from './ui/textarea2';
import { Bar } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bookings",
    },
  },
};

const reviewFormSchema = z.object({
  review: z.string().min(5, "Please enter a review of at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;


type Props = {
  bookings: any;
  userId: string;
}

export default function TabsComp({bookings, userId}: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [tourId, setTourId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState("");

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
  });

  const submitReview = useMutation({
    mutationFn: async (reviewData: ReviewFormData) => {
      const { review } = reviewData;
      const { data } = await axios.post("/api/reviews", {
        bookingId,
        tourId,
        userId,
        rating,
        review,
      });
      console.log(data);
      return data;
    },
  });

  function reviewSubmitHandler(reviewData: ReviewFormData) {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    submitReview.mutate(reviewData, {
      onSuccess({ data }) {
        console.log("Review successfully submitted.", { data });
        submitReview.mutate(reviewData);
        toast.success("Review successfully submitted");
        reviewForm.reset();
      },
      onError(error) {
        console.log("Error submitting review", { error });
        toast.error("Error submitting review");
      },
    });
  };

  function calcNoOfDaysBooked(startDate: string, endDate: string){
    let noOfDays = 0;
    const date = {
      from: new Date(startDate),
      to: new Date(endDate),
    };
    
    if(startDate === endDate) return 1;
    if(startDate && endDate){
      noOfDays = (date.to.getTime()) - (date.from.getTime());
      noOfDays = Math.ceil(noOfDays/(24*60*60*1000));
    };

    return noOfDays;
  };


  function calcNoOfDaysLeft(startDate: string, endDate: string) {
    const bookedDays = calcNoOfDaysBooked(startDate, endDate);

    if (!endDate) return 0;
    const checkOut = new Date(endDate);
    if (checkOut.getTime() <= new Date().getTime()) return 0;
    const timeDiff = checkOut.getTime() - new Date().getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    if (noOfDays > bookedDays) {
      return bookedDays;
    } else {
      return noOfDays;
    }
  };

  const labels = sortBy(bookings, "id")
  .reverse()
  .map((booking) => booking.tourName);
const amountSpent = sortBy(bookings, "id")
  .reverse()
  .map((booking) => booking.price);

  return (
    <Tabs defaultValue="bookings" className="w[300px] sm:w-full">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="bookings">
        <BookmarkFilledIcon /> Bookings
      </TabsTrigger>
      <TabsTrigger value="amount">
        <BanknoteIcon /> Amount
      </TabsTrigger>
    </TabsList>
    <TabsContent value="bookings" className="w-screen md:w-auto">
      <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tour Name</TableHead>
            <TableHead>Price (in USD)</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>No of Days Booked</TableHead>
            <TableHead>Days Left</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortBy(bookings, "id")
            .reverse()
            .map((booking: any, index: number) => (
              <TableRow key={index}>
                <TableCell
                  onClick={() =>
                    router.push(`/main/tour/${booking.tour.slug}`)
                  }
                  className="font-medium text-blue-600 cursor-pointer whitespace-nowrap underline"
                >
                  {booking.tourName}
                </TableCell>
                <TableCell>${booking.price}</TableCell>
                <TableCell>{booking.discount}%</TableCell>
                <TableCell>{calcNoOfDaysBooked(booking.startDate, booking.endDate)}</TableCell>
                <TableCell>
                  {calcNoOfDaysLeft(
                    booking.startDate,
                    booking.endDate
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          //* set this to be the id of the booked tour.
                          setTourId(booking.tour.id);
                          setBookingId(booking.id);
                          setRating(0);
                        }}
                        className="hover:underline"
                      >
                        Rate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Leave a rating.</DialogTitle>
                        <DialogDescription>
                          Let us know how you liked your tour.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gpa-4 py-4">
                        <div className="grid grid-cols-6 items-center gap-1">
                          <Label
                            htmlFor="rating"
                            className="text-right"
                          >
                            Rating
                          </Label>
                          {Array.from({ length: 5 }).map(
                            (_, index) => (
                              <Button
                                variant={"ghost"}
                                className="w-fit m-0"
                                onClick={() => setRating(index + 1)}
                                key={index}
                              >
                                {rating >= index + 1 ? (
                                  <StarFilledIcon
                                    color="orange"
                                    width={25}
                                    height={25}
                                  />
                                ) : (
                                  <StarIcon />
                                )}
                              </Button>
                            )
                          )}
                        </div>
                        <div className="grid gird-cols-6 items-center gap-4">
                          <Form {...reviewForm}>
                            <form
                              onSubmit={reviewForm.handleSubmit(
                                reviewSubmitHandler
                              )}
                              className="space-y-8"
                            >
                              <FormField
                                control={reviewForm.control}
                                name="review"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Textarea2
                                        {...field}
                                        placeholder="I had a great time on my tour."
                                        rows={8}
                                        className="scrollbar-hide h-[150px]"
                                      />
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />
                              <Button
                                disabled={submitReview.isPending}
                                type="submit"
                              >
                                {submitReview.isPending ? (
                                  <>
                                    <Loader2 className="animate-spin mr-2" />
                                    Submitting Review
                                  </>
                                ) : (
                                  <>Submit Review</>
                                )}
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TabsContent>
    <TabsContent value="amount">
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "Amount Spent",
              data: amountSpent,
              borderWidth: 1,
              backgroundColor: "#024034",
              hoverBackgroundColor: "#1e7967",
            },
          ],
        }}
      ></Bar>
    </TabsContent>
  </Tabs>
  )
}