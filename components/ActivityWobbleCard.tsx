"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import PriceTag from "./PriceTag";
import Link from "next/link";
import styles from "@/app/scss/main.module.scss";
import { Skeleton } from "@/components/ui/skeleton";
import { Activities } from "@/lib/types";

type Props = {
  activity: Activities;
  isLoading: boolean;
};

export default function ActivityWobbleCard({ activity, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <Skeleton
          className={`w-[250px] h-[200px] md:w-[400px] md:h-[450px] rounded-md shadow-md overflow-hidden`}
        >
          <div
            className={`w-[250px] h-[200px] md:w-[400px] md:h-[450px] bg-gradient-to-r from-transparent via-zinc-400/35 dark:via-zinc-700/40 to-transparent ${styles.skeleton_animation} overflow-hidden`}
          />
        </Skeleton>
      ) : (
        <WobbleCard containerClassName="w-[250px] h-[300px] md:w-[400px] md:h-[450px] shadow-md group">
          <Link href={`/main/activity/${activity.slug}`}>
            <Card className="p-0 w-[250px] h-[300px] md:w-[400px] md:h-[450px]">
              <CardContent className="p-0 w-full h-full">
                <Image
                  src={activity.imageUrl}
                  alt={activity.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md group-hover:scale-110 transition"
                />
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -50,
                    scaleX: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.75,
                  }}
                  className="relative w-fit z-10 bottom-20 ml-3 bg-primary px-2 rounded-md"
                >
                  <h2 className="font-semibold text-zinc-200 text-xl md:text-2xl">
                    {activity.name}
                  </h2>
                </motion.div>
              </CardContent>
            </Card>
          </Link>
        </WobbleCard>
      )}
    </>
  );
}
