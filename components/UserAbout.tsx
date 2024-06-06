"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea2 } from "./ui/textarea2";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import styles from "@/app/scss/main.module.scss";
import { Loader2 } from "lucide-react";

const aboutFormSchema = z.object({
  about: z
    .string()
    .min(10, "Please enter a description of at least 10 characters"),
});

type AboutFormData = z.infer<typeof aboutFormSchema>;

interface Props {
  userId: string;
  userAbout: string;
}

export default function UserAbout({userId, userAbout}: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const aboutForm = useForm<AboutFormData>({
    resolver: zodResolver(aboutFormSchema),
  });

  const submitProfileEdit = useMutation({
    mutationFn: async (aboutData: AboutFormData) => {
      const about = aboutData.about;
      const { data } = await axios.post("/api/profileEdit", {
        about,
        userId,
      });
      console.log(data);
      return data;
    },
  });

  function profileEditSubmitHandler(aboutData: AboutFormData) {
    submitProfileEdit.mutate(aboutData, {
      onSuccess({ data }) {
        console.log("Profile successfully edited.", { data });
        submitProfileEdit.mutate(aboutData);
        toast.success("Profile successfully edited");
        aboutForm.reset();
      },
      onError(error) {
        console.log("Error editing profile", { error });
        toast.error("Error editing profile. Please try again.");
      },
    });
    router.refresh();
    setIsOpen(false);
  }

  return (
    <div className="w-screen md:w-auto md:col-span-4 shadow-lg h-fit md:sticky md:top-10 bg-muted text-foreground rounded-lg px-6 py-4">
    <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
      <Image
        src={user?.imageUrl!}
        alt={user?.fullName!}
        width={500}
        height={500}
        className={`${styles.img} hover:scale-110 transition duration-300 rounded-full`}
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
                      defaultValue={userAbout}
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
        <p className="text-sm">{userAbout}</p>
      )}
    </div>
    <div className="font-normal text-left">
      {!isOpen && (
        <Button
        onClick={() => setIsOpen(true)}
        disabled={submitProfileEdit.isPending}
        >
          {
            submitProfileEdit.isPending ? (
              <>
              <Loader2 className="animate-spin mr-2"/>
              Editing Profile...
              </>
            ) : (
              <>Edit Profile</>
            )
          }
          </Button>
      )}
    </div>
  </div>
  );
}
