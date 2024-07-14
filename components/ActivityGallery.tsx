"use client";

import { ArrowLeft, ArrowRight, CircleXIcon, Images } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import styles from "@/app/scss/main.module.scss";

interface Props {
  images: string[];
}
export default function ActivityGallery({ images }: Props) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 5000);

  function openModal(index: number) {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  }

  function handlePrevious() {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  }

  function handleNext() {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  }

  function closeModal() {
    setShowModal(false);
  }

  const maximumVisibleImages = 5;
  const totalImages = images?.length;
  const displayImages = images?.slice(1, maximumVisibleImages - 1);
  const remainingImagesCount = totalImages - maximumVisibleImages;

  useEffect(() => {
    timer;
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 relative px-3 gap-3">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="hidden md:flex justify-center items-center">
            {loading ? (
              <AspectRatio ratio={12 / 10}>
                <Skeleton
                  className={`w-full h-full rounded-md shadow-md overflow-hidden`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-r from-transparent via-zinc-400/35 dark:via-zinc-700/40 to-transparent ${styles.skeleton_animation} overflow-hidden`}
                  />
                </Skeleton>
              </AspectRatio>
            ) : (
              <AspectRatio ratio={12 / 10}>
                <Image
                  src={images[0] || ""}
                  alt={`Tour image ${currentPhotoIndex + 1}`}
                  fill
                  className="object-cover rounded-sm hover:scale-110 transition duration-500 cursor-pointer"
                  onClick={openModal.bind(this, 0)}
                />
              </AspectRatio>
            )}
          </div>
          <div className="flex flex-col font-semibold text-xl md:hidden justify-center items-start gap-3 w-full h-full">
            <h2>Gallery</h2>
            {loading ? (
              <AspectRatio ratio={16 / 9}>
                <Skeleton
                  className={`w-full h-full rounded-md shadow-md overflow-hidden`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-r from-transparent via-zinc-400/35 dark:via-zinc-700/40 to-transparent ${styles.skeleton_animation} overflow-hidden`}
                  />
                </Skeleton>
              </AspectRatio>
            ) : (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={images[currentPhotoIndex] || ""}
                  alt={`Tour image ${currentPhotoIndex + 1}`}
                  width={680}
                  height={510}
                  className="object-cover rounded-sm w-full h-full"
                  onClick={openModal.bind(this, 0)}
                />
              </AspectRatio>
            )}
          </div>
        </div>
        <div className="flex md:hidden justify-between items-center">
          <div className="flex space-x-2">
            <ArrowLeft className="cursor-pointer" onClick={handlePrevious} />
            <ArrowRight className="cursor-pointer" onClick={handleNext} />
          </div>
          <span>
            {currentPhotoIndex + 1}/{images?.length}
          </span>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-3">
          {displayImages?.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-2xl overflow-hidden"
            >
              {loading ? (
                <AspectRatio ratio={6 / 5}>
                  <Skeleton
                    className={`w-full h-full rounded-md shadow-md overflow-hidden`}
                  >
                    <div
                      className={`w-full h-full bg-gradient-to-r from-transparent via-zinc-400/35 dark:via-zinc-700/40 to-transparent ${styles.skeleton_animation} overflow-hidden`}
                    />
                  </Skeleton>
                </AspectRatio>
              ) : (
                <AspectRatio ratio={6 / 5}>
                  <Image
                    src={image}
                    alt={`Tour image ${index + 2}`}
                    width={680}
                    height={510}
                    className="object-cover rounded-sm w-full h-full hover:scale-110 transition duration-500"
                  />
                </AspectRatio>
              )}
            </div>
          ))}
          {remainingImagesCount > 0 && (
            <div
              className="cursor-pointer relative rounded-2xl overflow-hidden"
              onClick={openModal.bind(this, maximumVisibleImages)}
            >
              <AspectRatio ratio={6 / 5}>
                <Image
                  src={images[maximumVisibleImages - 1]}
                  alt={`Tour image ${maximumVisibleImages}`}
                  width={680}
                  height={510}
                  className="object-cover rounded-sm w-full h-full"
                />
              </AspectRatio>
              <div className="absolute cursor-pointer text-white inset-0 flex justify-center bg-[rgba(0,0,0,0.5)] items-center text-xl">
                + {remainingImagesCount}
              </div>
            </div>
          )}
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-[55] rounded-sm">
            <div className="h-[75vh] w-[320px] md:w-[700px] relative">
              <Image
                src={images[currentPhotoIndex] || ""}
                alt={`Tour image ${currentPhotoIndex + 1}`}
                width={680}
                height={510}
                className="object-cover rounded-sm w-full h-full"
              />
              <div className="flex justify-between items-center py-3">
                <div className="flex space-x-2 items-center text-white">
                  <ArrowLeft
                    className="cursor-pointer"
                    onClick={handlePrevious}
                  />
                  <ArrowRight className="cursor-pointer" onClick={handleNext} />
                </div>
                <span className="text-white text-sm">
                  {currentPhotoIndex + 1}/{images?.length}
                </span>
              </div>
            </div>
            <Button
              className="absolute top-2 right-2 rounded-full text-white text-lg"
              variant={"ghost"}
              onClick={closeModal}
            >
              <CircleXIcon className="font-medium text-2xl text-primary" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
