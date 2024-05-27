"use client";

import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Separator } from "@/components/ui/separator";
import { WobbleCard } from "@/components/ui/wobble-card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ToursPage() {
  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
  ];

  const projects = [
    {
      title: "Serengeti",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
      imageUrl:
        "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
      price: "$300",
    },
    {
      title: "Ngorongoro Crater",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
      imageUrl:
        "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
      price: "$400",
    },
    {
      title: "Kilimanjaro",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
      imageUrl:
        "https://images.unsplash.com/photo-1641133293051-53a542184429?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhbnphbmlhJTIwc2FmYXJpJTIwbGlvbnN8ZW58MHx8MHx8fDA%3D",
      price: "$250",
    },
    {
      title: "Manyara National Park",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
      imageUrl:
        "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
      price: "$300",
    },
  ];  

  return (
    <div>
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
      <div className="mt-10 md:mt-20">
      <div className="flex flex-col justify-center items-center w-3/4 gap-3 mx-auto font-chillax my-20 my:mb-40">
        <h3 className="text-black/60 dark:text-white/60 text-base">SEARCH</h3>
        <h2 className="text-center text-3xl md:text-5xl">
          <span className="font-semibold">AVAILABLE</span> TOURS
        </h2>
        <SearchBar />
      </div>
        <Separator className="mt-20"/>
        <div className="flex flex-row flex-wrap gap-5 mx-auto justify-center my-20">
          {projects.map((project, index) => (
            <WobbleCard
            key={index}
            containerClassName="w-[250px] h-[300px] md:w-[400px] md:h-[450px] shadow-md group"
            >
            <Card className="p-0 w-[250px] h-[300px] md:w-[400px] md:h-[450px]">
              <CardContent className="p-0 w-full h-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
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
                    {project.title}
                  </h2>
                  <p className="font-medium text-black text-base">From {project.price}</p>
                </div>
              </CardContent>
            </Card>
            </WobbleCard>
          ))}
        </div>
      </div>
    </div>
  );
};