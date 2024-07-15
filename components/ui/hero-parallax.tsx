"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { HeroHighlightComp } from "../HighlightText";
import { DirectionAwareHover } from "./direction-aware-hover";
import PriceTag from "../PriceTag";
import { Activities } from "@/lib/types";

export const HeroParallax = ({ products }: { products: Activities[] }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.id}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        <HeroHighlightComp />
      </h1>
      <motion.p
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
          delay: 1,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="max-w-2xl text-base md:text-2xl mt-8 dark:text-neutral-200"
      >
        Craft your dream African adventure with The Best of Africa Safaris.
        Witness iconic wildlife, breathtaking landscapes, and unforgettable
        sunsets on safaris led by expert guides.
      </motion.p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Activities;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.id}
      className="group group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={`/main/activity/${product.slug}`}
        className="block group-hover/product:shadow-2xl "
      >
        <DirectionAwareHover imageUrl={product.imageUrl}>
          <h2 className="font-bold text-xl">
            <motion.div
              initial={{
                opacity: 0,
                x: -100,
              }}
              whileInView={{
                opacity: 1,
                x: -25,
              }}
              transition={{
                duration: 0.5,
              }}
              className="absolute hidden group-hover:block -z-10 inset-0 w-full h-7 bg-primary"
            />
            {product.name}
          </h2>
        </DirectionAwareHover>
      </Link>
    </motion.div>
  );
};
