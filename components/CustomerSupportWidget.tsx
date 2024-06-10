"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MessageCircleMore, Send } from "lucide-react";
import { Button } from "./ui/button";
import styles from "@/app/scss/main.module.scss";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function CustomerSupportWidget() {
  const file_key = "The-Best-of-Africa-Safaris.pdf";
  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        file_key,
      },
    });


  const createChat = useMutation({
    mutationFn: async () => {
      const data = axios.post("/api/create-chat", {
        file_key,
      });
      return data;
    },
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  function handleCreateChat() {
    createChat.mutate(undefined, {
      onSuccess({ data }) {
        console.log("Chat created", { data });
        createChat.mutate();
      },
      onError(error) {
        console.log("Failed to create chat", error);
      },
    });
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={handleCreateChat}
            variant={"ghost"}
            className="w-[90px] h-[90px] rounded-full sticky z-50 bottom-4 left-[92.5vw]"
          >
            <MessageCircleMore size={59} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 md:w-[400px] mr-3">
          <div
            className="relative max-h-[80vh] overflow-scroll scrollbar-hide"
            id="message-container"
          >
            <div className="sticky top-0 inset-x-0 p-2 h-fit bg-popover">
              <h3 className="text-2xl font-bold">Customer Support</h3>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Ask us anything
              </p>
            </div>
            <div className="flex flex-col gap-2 px-4 mb-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", {
                    "justify-end pl-10": message.role === "user",
                    "justify-start pr-10": message.role === "assistant",
                  })}
                >
                  <div
                    className={cn(
                      `rounded-md px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10`,
                      {
                        "bg-blue-600 text-white": message.role === "user",
                        "dark:bg-white dark:text-black":
                          message.role === "assistant",
                      }
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {isLoading && (
              <div className={`${styles.bouncing_loader} px-3 py-1`}>
                <div/>
                <div/>
                <div/>
              </div>
            )}
            <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-end sticky bottom-0 inset-x-0 px-2 py-4"
            >
              <Input
                value={input}
                placeholder="What Safaris do you have available?"
                onChange={handleInputChange}
                className="w-1/2"
              />
              <Button type="submit" className="bg-blue-600 ml-2">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-muted-foreground text-xs md:text-[13px] mt-1">Made with AI by <Link href="https://ayanda.vercel.app" className="underline">Ayanda Kinyambo</Link></p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
