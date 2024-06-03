"use client";

import { ImagesSlider } from './ui/images-slider'
import {motion} from "framer-motion";

type Props = {
    images: string[];
}

export default function ImageSlider({images}: Props) {
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
    <motion.div
      initial={{
        opacity: 0,
        y: -80,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="z-50 flex flex-col justify-center items-center"
    >
      <motion.p className="font-bold text-xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Crafting unforgettable journeys into the soul of <br /> Africa with
        the Best of Africa Safaris.
      </motion.p>
    </motion.div>
  </ImagesSlider>
  )
}