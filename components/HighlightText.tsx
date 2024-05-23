"use client";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";

export function HeroHighlightComp() {
  return (
    <>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl md:text-7xl font-bold lg:text-5xl text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug"
      >
        The Best of <br/>
        <Highlight className="text-black dark:text-white">
          Africa Safaris
        </Highlight>
      </motion.h1>
    </>
  );
}
