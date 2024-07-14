import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { prisma } from "@/lib/db/prisma";

export default async function Testimonials() {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      activity: true,
    },
  });

  return (
    <div className="relative flex flex-col justify-center items-center w-screen gap-3 font-chillax">
      <h3 className="text-black/60 dark:text-white/60 text-base">
        TESTIMONIALS
      </h3>
      <div className="rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden mb-30">
        <InfiniteMovingCards
          items={reviews}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};
