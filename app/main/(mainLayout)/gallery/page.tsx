"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CircleXIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";

export default function Gallery() {
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const animals = [
    {
      name: "Lion",
      type: "Mammal",
      imageUrl: "/images/lions/lions1.jpg",
      images: [
        "/images/lions/lions2.jpg",
        "/images/lions/lions3.jpg",
        "/images/lions/lions4.jpg",
        "/images/lions/lions5.jpg",
      ],
    },
    {
      name: "Giraffe",
      type: "Mammal",
      imageUrl: "/images/giraffes/giraffe1.jpg",
      images: [
        "/images/giraffes/giraffe2.jpg",
        "/images/giraffes/giraffe3.jpg",
        "/images/giraffes/giraffe4.jpg",
        "/images/giraffes/giraffe5.jpg",
      ],
    },
    {
      name: "Zebra",
      type: "Mammal",
      imageUrl: "/images/zebra/zebra1.jpg",
      images: [
        "/images/zebra/zebra2.jpg",
        "/images/zebra/zebra3.jpg",
        "/images/zebra/zebra4.jpg",
        "/images/zebra/zebra5.jpg",
        "/images/zebra/zebra6.jpg",
      ],
    },
    {
      name: "Elephant",
      type: "Mammal",
      imageUrl: "/images/elephants/elephant1.jpg",
      images: [
        "/images/elephants/elephant2.jpg",
        "/images/elephants/elephant3.jpg",
        "/images/elephants/elephant4.jpg",
        "/images/elephants/elephant5.jpg",
      ],
      video: "/images/elephants/elephants-vid.mp4",
    },
    {
      name: "Crocodile",
      type: "Reptile",
      imageUrl: "/images/crocodile/crocodile3.jpg",
      images: [
        "/images/crocodile/crocodile1.jpg",
        "/images/crocodile/crocodile2.jpg",
      ],
    },
    {
      name: "Buffalo",
      type: "Mammal",
      imageUrl: "/images/buffalo/buffalo1.jpg",
      images: [
        "/images/buffalo/buffalo2.jpg",
        "/images/buffalo/buffalo3.jpg",
        "/images/buffalo/buffalo4.jpg",
        "/images/buffalo/buffalo5.jpg",
        "/images/buffalo/buffalo6.jpg",
      ],
    },
    {
      name: "Hyena",
      type: "Mammal",
      imageUrl: "/images/hyena/hyena3.jpg",
      images: [
        "/images/hyena/hyena2.jpg",
        "/images/hyena/hyena1.jpg",
        "/images/hyena/hyena4.jpg",
      ],
    },
    {
      name: "Kori Bustard",
      type: "Bird",
      imageUrl: "/images/kori-bustard/kori-bustard1.jpg",
      images: [
        "/images/kori-bustard/kori-bustard2.jpg",
        "/images/kori-bustard/kori-bustard3.jpg",
      ],
      video: "/images/kori-bustard/kori-bustard-vid.mp4",
    },
  ];

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="mb-20 md:mb-40">
      <ImageSlider
        textp1={"Immerse yourself in the wonder of Africa through"}
        textp2={"our gallery."}
      >
        <Button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link href={"/main/activities"} className="w-full">
            Book an activity now →
          </Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </Button>
      </ImageSlider>
      <div className="mt-20 md:mt-40 flex flex-row flex-wrap md:w-[700px] lg:w-[900px] mx-auto gap-3">
        {animals.map((animal, index) => (
          <>
            <div
              key={index}
              onClick={() => {
                setShowModal(true);
                setModalIndex(index);
              }}
              className="relative shadow-xl w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto rounded-xl group overflow-hidden"
            >
              <Image
                src={animal.imageUrl}
                alt={animal.name}
                width={900}
                height={900}
                className=" w-full h-full rounded-xl group-hover:scale-125 transition duration-1000"
              />
              <div className="bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-1000 w-full h-[33.33%] flex flex-col justify-center pl-5 absolute bottom-0 z-10" />
              <div className="bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 w-full h-full flex flex-col justify-center pl-5 absolute bottom-0 z-10" />
              <div className="w-full h-[33.33%] flex flex-col justify-center pl-5 absolute bottom-0 z-10">
                <h3 className="text-lg font-medium text-neutral-200 group-hover:text-[#F2AC29] dark:group-hover:text-[#ba8117] transition-colors duration-1000">
                  {animal.type}
                </h3>
                <p className="font-chillax font-semibold text-2xl text-neutral-300 group-hover:text-foreground dark:group-hover:text-zinc-900 transition-colors duration-1000">
                  {animal.name}
                </p>
              </div>
            </div>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="fixed bg-black/40 z-50 left-0 top-0 w-screen h-screen"
              >
                <Carousel className="w-[300px] md:w-full max-w-lg mx-auto relative top-[120px]">
                  <CarouselContent>
                    {animals[modalIndex].images.map((image, index) => {
                      return (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Image
                              src={image}
                              alt={image}
                              width={900}
                              height={900}
                              className="aspect-square rounded-xl group-hover:scale-125 transition duration-1000"
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                    {animals[modalIndex].video && (
                      <CarouselItem>
                        <video
                          src={animals[modalIndex].video}
                          controls
                          className="h-[520px] w-[600px] bg-black rounded-xl group-hover:scale-125 transition duration-1000"
                        />
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <Button
                  className="absolute top-2 right-2 rounded-full text-white text-lg"
                  variant={"ghost"}
                  onClick={closeModal}
                >
                  <CircleXIcon className="font-medium text-2xl text-primary" />
                </Button>
              </motion.div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
