"use client";

import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import {motion} from "framer-motion";
import { Tours } from '@/lib/types';
import { WobbleCard } from './ui/wobble-card';
import PriceTag from './PriceTag';
import Link from 'next/link';

type Props = {
  tour: Tours;
}

export default function TourWobbleCard({tour}: Props) {
  return (
    <WobbleCard
    containerClassName="w-[250px] h-[300px] md:w-[400px] md:h-[450px] shadow-md group"
    >
      <Link href={`/main/tour/${tour.slug}`}>
    <Card className="p-0 w-[250px] h-[300px] md:w-[400px] md:h-[450px]">
      <CardContent className="p-0 w-full h-full">
        <Image
          src={tour.imageUrl}
          alt={tour.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-md group-hover:scale-110 transition"
        />
        <div className="relative w-fit z-10 bottom-20 ml-3">
          <h2 className="font-semibold text-black text-xl md:text-2xl">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                x: -25,
                scaleX: 0.65,
              }}
              transition={{
                duration: 0.3,
              }}
              className="absolute hidden group-hover:block -z-10 inset-0 w-[125px] h-7 bg-primary"
            />
            {tour.name}
          </h2>
          <p className="font-medium text-black text-base">From <PriceTag price={tour.price}/></p>
        </div>
      </CardContent>
    </Card>
    </Link>
    </WobbleCard>
  )
}