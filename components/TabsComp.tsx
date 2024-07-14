"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookmarkFilledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Loader2, StarIcon, Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { sortBy } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea2 } from "./ui/textarea2";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const reviewFormSchema = z.object({
  review: z.string().min(5, "Please enter a review of at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

type Props = {
  bookings: any;
  reviews: any;
  userId: string;
};

export default function TabsComp({ bookings, reviews, userId }: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [activityId, setActivityId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
  });

  const submitReview = useMutation({
    mutationFn: async (reviewData: ReviewFormData) => {
      const { review } = reviewData;
      const { data } = await axios.post("/api/reviews", {
        bookingId,
        activityId,
        userId,
        rating,
        review,
      });
      return data;
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await axios.delete(`/api/delete-review/${reviewId}`);
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
        router.refresh();
      },
      onError(error) {
        console.log("Error submitting review", { error });
        toast.error("Error submitting review");
      },
    });
  }

  function handleReviewDelete(reviewId: string) {
    deleteReview.mutate(reviewId, {
      onSuccess(data) {
        console.log(data);
        toast.success("Review successfully deleted");
        router.refresh();
      },
      onError(error) {
        console.log("Error deleting review", { error });
        toast.error("Error deleting review. Please try again.");
      },
    });
  }

  function calcNoOfDaysBooked(startDate: string, endDate: string) {
    let noOfDays = 0;
    const date = {
      from: new Date(startDate),
      to: new Date(endDate),
    };

    if (startDate === endDate) return 1;
    if (startDate && endDate) {
      noOfDays = date.to.getTime() - date.from.getTime();
      noOfDays = Math.ceil(noOfDays / (24 * 60 * 60 * 1000));
    }

    return noOfDays;
  }

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
  }

  function getActivityName(activityId: string) {
    return bookings.find((booking: any) => booking.activity.id === activityId)
      .activityName;
  }

  return (
    <Tabs defaultValue="bookings" className="w-full">
      <TabsList className="grid w-[300px] md:w-full grid-cols-2 pb-1">
        <TabsTrigger
          value="bookings"
          className="flex items-center relative bottom-[2px] h-9"
        >
          <BookmarkFilledIcon className="w-7 h-7" /> Your Bookings
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="flex items-center gap-1 relative bottom-[2px] h-9"
        >
          <StarFilledIcon className="w-7 h-7" /> Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bookings" className="w-[300px] md:w-full">
        <Table>
          <TableCaption>
            {bookings.length === 0 ? (
              <>
                You have no bookings. Go to one of the activity&apos;s pages to
                make a booking.
              </>
            ) : (
              <>A list of your recent bookings.</>
            )}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Activity Name</TableHead>
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
                      router.push(`/main/activity/${booking.activity.slug}`)
                    }
                    className="font-medium text-blue-600 cursor-pointer whitespace-nowrap underline"
                  >
                    {booking.activityName === "Volunteering"
                      ? booking.activityName
                      : "7 Day Trip"}
                  </TableCell>
                  <TableCell>
                    {calcNoOfDaysBooked(booking.startDate, booking.endDate)}
                  </TableCell>
                  <TableCell>
                    {calcNoOfDaysLeft(booking.startDate, booking.endDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setActivityId(booking.activity.id);
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
                            Let us know how you liked your trip.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gpa-4 py-4">
                          <div className="grid grid-cols-6 items-center gap-1">
                            <Label htmlFor="rating" className="text-right">
                              Rating
                            </Label>
                            {Array.from({ length: 5 }).map((_, index) => (
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
                            ))}
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
                                          placeholder="I had a great time on my trip."
                                          rows={8}
                                          className="scrollbar-hide h-[150px]"
                                        />
                                      </FormControl>
                                      <FormMessage />
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
      <TabsContent value="reviews" className="w-[300px] md:w-full">
        <Table>
          <TableCaption>
            {reviews.length !== 0 ? (
              <>
                You have reviews. Rate one of your trips to see your reviews
                here.
              </>
            ) : (
              <>A list of your recent reviews.</>
            )}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Activity Name</TableHead>
              <TableHead>No of Stars</TableHead>
              <TableHead>Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortBy(reviews, "id")
              .reverse()
              .map((review: any, index: number) => (
                <TableRow key={index}>
                  <TableCell
                    onClick={() =>
                      router.push(`/main/activity/${review.activity.slug}`)
                    }
                    className="font-medium text-blue-600 cursor-pointer whitespace-nowrap underline"
                  >
                    {getActivityName(review.activityId) === "Volunteering"
                      ? "Volunteering"
                      : "7 Day Trip"}
                  </TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>
                    {review.review.slice(0, 25)}
                    {review.review.length > 25 && "..."}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this rating?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this rating.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleReviewDelete(review.id);
                              toast.info("Deleting review...");
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setActivityId(review.activity.id);
                            setBookingId(review.bookingId);
                            setRating(0);
                          }}
                          className="hover:underline"
                        >
                          Edit Rating
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit your review.</DialogTitle>
                          <DialogDescription>
                            Let us know how you liked your trip.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gpa-4 py-4">
                          <div className="grid grid-cols-6 items-center gap-1">
                            <Label htmlFor="rating" className="text-right">
                              Rating
                            </Label>
                            {Array.from({ length: 5 }).map((_, index) => (
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
                            ))}
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
                                          defaultValue={review.review}
                                          rows={8}
                                          className="scrollbar-hide h-[150px]"
                                        />
                                      </FormControl>
                                      <FormMessage />
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
                                      Editing Review
                                    </>
                                  ) : (
                                    <>Edit Review</>
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
    </Tabs>
  );
}
