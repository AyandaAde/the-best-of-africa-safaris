"use client";

import { Button } from "@/components/ui/button";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CircleXIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
  ];

  const animals = [
    {
      name: "Lion",
      type: "Mamal",
      imageUrl:
        "https://images.unsplash.com/photo-1648079107818-933f1635b08b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhbnphbmlhJTIwc2FmYXJpJTIwbGlvbnxlbnwwfHwwfHx8MA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        ],
    },
    {
      name: "Giraffe",
      type: "Mamal",
      imageUrl:
        "https://images.unsplash.com/photo-1528448103896-24ba8a0ad2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcmklMjBnaXJhZmZlfGVufDB8fDB8fHww",
        images: [
          "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        ],
    },
    {
      name: "Zebra",
      type: "Mamal",
      imageUrl:
        "https://images.unsplash.com/photo-1689479665287-60c09e2795e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhbnphbmlhJTIwc2FmYXJpJTIwemVicmF8ZW58MHx8MHx8fDA%3D",
        images: [
          "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        ],
    },
    {
      name: "Elephant",
      type: "Mamal",
      imageUrl:
        "https://images.unsplash.com/photo-1520542059400-dc9d1d8ae9de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFuemFuaWElMjBzYWZhcmklMjBlbGVwaGFudHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        ],
    },
  ];

  function openModal(index: number) {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  }

  function handlePrevious() {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNext() {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function closeModal() {
    setShowModal(false);
  }

  const maximumVisibleImages = 5;
  const totalImages = images.length;

  return (
    <div className="mb-20 md:mb-40">
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
            Immerse yourself in the wonder of Africa through <br /> our gallery.
          </motion.p>
          <Button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Book a Tour Now →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#024034] to-transparent" />
          </Button>
        </motion.div>
      </ImagesSlider>
      <div className="mt-20 md:mt-40 flex flex-row flex-wrap md:w-[700px] lg:w-[900px] mx-auto gap-3">
        {animals.map((animal, index) => (
          <>
            <div
              key={index}
              onClick={() => setShowModal(true)}
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
            {
              showModal && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{duration:1}}
                className="fixed bg-black/40 z-50 left-0 top-0 w-screen h-screen">
              <Carousel className="w-[300px] md:w-full max-w-lg mx-auto relative top-[120px]">
                <CarouselContent>
                  {animal.images.map((image, index) => (
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
                  ))}
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
              )
            }
          </>
        ))}
      </div>
    </div>
  );
}
