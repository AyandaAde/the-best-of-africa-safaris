"use client";


import { ImagesSlider } from './ui/images-slider'
import {motion} from "framer-motion";

type Props = {
    textp1: string;
    textp2: string;
    children?: React.ReactNode;
}

export default function ImageSlider({children, textp1, textp2}: Props) {
  
  const images = [
    "/images/flamingos.jpg",
    "/images/lions/lions1.jpg",
    "/images/buffalo/buffalo1.jpg",
    "/images/crocodile/crocodile2.jpg",
    "/images/elephants/elephant1.jpg",
    "/images/giraffes/giraffe2.jpg",
    "/images/hyena/hyena2.jpg",
    "/images/kori-bustard/kori-bustard2.jpg",
    "/images/zebra/zebra4.jpg",
  ];

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
        {textp1} <br/> {textp2}
      </motion.p>
      {children}
    </motion.div>
  </ImagesSlider>
  )
}