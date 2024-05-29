"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import styles from "@/app/scss/main.module.scss";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea2 } from "@/components/ui/textarea2";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkFilledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { BanknoteIcon, Loader2, StarIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sortBy } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Bar } from "react-chartjs-2";
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
const aboutFormSchema = z.object({
  about: z
    .string()
    .min(10, "Please enter a description of at least 10 characters"),
});

const reviewFormSchema = z.object({
  review: z.string().min(5, "Please enter a review of at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;
type AboutFormData = z.infer<typeof aboutFormSchema>;

export default function UserPage(props: { params: { id: string } }) {
  const {
    params: { id: userId },
  } = props;
  const { user } = useUser();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tourId, setTourId] = useState<string | null>(null);

  const aboutForm = useForm<AboutFormData>({
    resolver: zodResolver(aboutFormSchema),
  });

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
  });

  const submitReview = useMutation({
    mutationFn: async (reviewData: ReviewFormData) => {
      const { review } = reviewData;
      const { data } = await axios.post("/api/reviews", {
        tourId,
        rating,
        review,
      });
      console.log(data);
      return data;
    },
  });

  const submitProfileEdit = useMutation({
    mutationFn: async (aboutData: AboutFormData) => {
      const { data } = await axios.post("/api/profileEdit", aboutData);
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
      },
      onError(error) {
        console.log("Error submitting review", { error });
        toast.error("Error submitting review");
      },
    });
  }

  function profileEditSubmitHandler(aboutData: AboutFormData) {
    submitProfileEdit.mutate(aboutData, {
      onSuccess({ data }) {
        console.log("Profile successfully edited.", { data });
        submitProfileEdit.mutate(aboutData);
        toast.success("Profile successfully edited");
      },
      onError(error) {
        console.log("Error editing profile", { error });
        toast.error("Error editing profile. Please try again.");
      },
    });
    router.refresh();
    setIsOpen(false);
  }

  function calcNoOfDays(checkOutDate: any, bookedDays: any) {
    if (!checkOutDate) return 0;
    const checkOut = new Date(checkOutDate);
    if (checkOut.getTime() <= new Date().getTime()) return 0;
    const timeDiff = checkOut.getTime() - new Date().getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    if (noOfDays > bookedDays) {
      return bookedDays;
    } else {
      return noOfDays;
    }
  }

  const bookings = [
    {
      checkInDate: "2022-12-01",
      checkOutDate: "2022-12-05",
      bookedDays: 5,
      tourName: "Serengeti",
      slug: "serengeti",
      price: 500,
      discount: 10,
    },
    {
      checkInDate: "2023-12-01",
      checkOutDate: "2023-12-04",
      bookedDays: 4,
      tourName: "Kilimanjaro",
      slug: "kilimanjaro",
      price: 300,
      discount: 10,
    },
    {
      checkInDate: "2024-12-01",
      checkOutDate: "2024-12-06",
      bookedDays: 6,
      tourName: "Ngorongoro Crater",
      slug: "ngorongoro-crater",
      price: 200,
      discount: 10,
    },
    {
      checkInDate: "2024-12-01",
      checkOutDate: "2024-12-07",
      bookedDays: 7,
      tourName: "Manyara National Park",
      slug: "manyara-national-park",
      price: 250,
      discount: 10,
    },
    {
      checkInDate: "2024-05-28",
      checkOutDate: "2024-05-31",
      bookedDays: 4,
      tourName: "Serengeti",
      slug: "serengeti",
      price: 500,
      discount: 25,
    },
  ];

  const labels = sortBy(bookings, "checkInDate")
    .reverse()
    .map((booking) => booking.tourName);
  const amountSpent = sortBy(bookings, "checkInDate")
    .reverse()
    .map((booking) => booking.price);

  return (
    <div className="container mx-auto px-2 md:px-4 mt-20 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="w-screen md:w-auto md:col-span-4 lg:col-span-3 shadow-lg h-fit md:sticky md:top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl!}
              alt={user?.fullName!}
              width={500}
              height={500}
              className={`${styles.img} scale-animation rounded-full`}
            />
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            {isOpen ? (
              <Form {...aboutForm}>
                <form
                  onSubmit={aboutForm.handleSubmit(profileEditSubmitHandler)}
                  className="space-y-8"
                >
                  <FormField
                    control={aboutForm.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea2
                            //* add user about data from the database to the default value.
                            defaultValue={"I'm an avid traveler"}
                            {...field}
                            rows={8}
                            className="scrollbar-hide h-[150px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Changes</Button>
                </form>
              </Form>
            ) : (
              //* Add user about info here.
              <p className="text-sm">&quot;&quot;</p>
            )}
          </div>
          <div className="font-normal text-left">
            {!isOpen && (
              <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
        <div className="md:col-span-7 lg:col-span-8">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {user?.fullName}</h5>
          </div>
          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8">
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
                    {/** Add bookings here */}
                    {sortBy(bookings, "checkInDate")
                      .reverse()
                      .map((booking: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell
                            onClick={() =>
                              router.push(`/main/tour/${booking.slug}`)
                            }
                            className="font-medium text-blue-600 cursor-pointer whitespace-nowrap underline"
                          >
                            {booking.tourName}
                          </TableCell>
                          <TableCell>${booking.price}</TableCell>
                          <TableCell>{booking.discount}%</TableCell>
                          <TableCell>{booking.bookedDays}</TableCell>
                          <TableCell>
                            {calcNoOfDays(
                              booking.checkOutDate,
                              booking.bookedDays
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  onClick={() => {
                                    //* set this to be the id of the booked tour.
                                    setTourId(booking.bookedDays);
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
          </nav>
        </div>
      </div>
    </div>
  );
}
