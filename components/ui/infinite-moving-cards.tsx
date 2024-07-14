"use client";

import { Review } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Review[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen max-w-7xl overflow-hidden dark:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] md:h-auto max-w-full overflow-y-scroll overflow-x-hidden scrollbar-hide  relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--green-900), var(--green-950)",
            }}
            key={item.id}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <div className="flex gap-2 items-center mb-2">
                <Image
                  src={item.user.image!}
                  alt={item.user.fName!}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="my-1 md:my-0 flex items-center">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <StarFilledIcon
                      key={index}
                      color={"orange"}
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  ))}
                </div>
              </div>
              <span className=" relative z-20 text-sm sm:text-base sm:leading-[1.6] text-gray-100 font-normal">
                {item.review}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm sm:text-base sm:leading-[1.6] text-gray-400 font-normal">
                    {item.user.fName} {item.user.lName}
                  </span>
                  <span className="text-sm sm:text-base sm:leading-[1.6] text-gray-400 font-normal">
                    Activity:{" "}
                    {item.activity.name === "Volunteering"
                      ? "Volunteering"
                      : "7 day trip"}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
