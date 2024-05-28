"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input2 } from "@/components/ui/input2";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Textarea2 } from "@/components/ui/textarea2";
import { Button } from "@/components/ui/button";
import { Contact, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const contactFormSchema = z.object({
    fName: z.string().min(2, {
        message: "First name must be at least two characters."
    }),
    lName: z.string().min(2, {
        message: "Last name must be at least two characters."
    }),
    email: z.string().email("Invalid email address"),
    message: z.string().min(2, "Message must be at least 2 chacters"),
});

type ContactForm = z.infer<typeof contactFormSchema>;
export default function Contact() {
    const router = useRouter();

    const contactForm = useForm<ContactForm>({
        resolver: zodResolver(contactFormSchema),
    });

    const sendMessage = useMutation({
        mutationFn: async (messageData: ContactForm) => {
            const {fName, lName, email, message} = messageData;
            const {data} = await axios.post("/api/sendMessage", {
                fName,
                lName,
                email,
                message,
            });
            return data;
        },
    });

    function onSubmit(messageData: ContactForm) {
        sendMessage.mutate(messageData, {
            onSuccess({message}){
                console.log("Message successfully sent.", {message});
                sendMessage.mutate(messageData);
                toast.success("Message successfully sent!");
                contactForm.reset();
                router.refresh();

            },
            onError(error){
                console.log("Error sending message.", error);
                toast.error("Error sending message!");
            }
        });
    }
  return (
    <AuroraBackground className="pt-20 md:pt-28 h-[125vh]">
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
     <Card className="w-[300px] md:w-full mx-auto bg-white/90 dark:bg-black/90">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl underline mb-3">Contact Us</CardTitle>
        <CardDescription>Get in touch and ask us anything about our safaris.</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...contactForm}>
      <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={contactForm.control}
          name="fName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input2 placeholder="Jessie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={contactForm.control}
          name="lName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input2 placeholder="Doberman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input2 type="email" placeholder="jdoberman@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea2 className="h-[100px] md:h-[150px]" placeholder="Ask us anything." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
        disabled={sendMessage.isPending}
        type="submit">
          {
          sendMessage.isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Submitting
            </>
          ) : (
            <>Submit</>
          )
        }
        </Button>
      </form>
    </Form>
      </CardContent>
    </Card>
    </motion.div>
  </AuroraBackground>
  )
}