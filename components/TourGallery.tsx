"use client";

import { ArrowLeft, ArrowRight, CircleXIcon, Images } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";

export default function TourGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665413-e954e8a36240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665481-1c891748e8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661915734413-d1378996e656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1612358405627-3721c6fc5fac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhbnphbmlhJTIwc2FmYXJpfGVufDB8fDB8fHww",
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
  const displayImages = images.slice(1, maximumVisibleImages - 1);
  const remainingImagesCount = totalImages - maximumVisibleImages;

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 relative px-3 gap-3">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="hidden md:flex justify-center items-center">
            <AspectRatio ratio={12/10}>
            <Image
              src={images[0]}
              alt={`Tour image ${currentPhotoIndex + 1}`}
              fill
              className="object-cover rounded-sm hover:scale-110 transition duration-500 cursor-pointer"
              onClick={openModal.bind(this, 0)}
            />
            </AspectRatio>
          </div>
          <div className="flex flex-col font-semibold text-xl md:hidden justify-center items-start gap-3 w-full h-full">
            <h2>Gallery</h2>
            <AspectRatio ratio={16/9}>
            <Image
              src={images[currentPhotoIndex]}
              alt={`Tour image ${currentPhotoIndex + 1}`}
              width={680}
              height={510}
              className="object-cover rounded-sm w-full h-full"
              onClick={openModal.bind(this, 0)}
            />
            </AspectRatio>
          </div>
        </div>
        <div className="flex md:hidden justify-between items-center">
          <div className="flex space-x-2">
            <ArrowLeft className="cursor-pointer" onClick={handlePrevious} />
            <ArrowRight className="cursor-pointer" onClick={handleNext} />
          </div>
          <span>
            {currentPhotoIndex + 1}/{images.length}
          </span>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-3">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-2xl overflow-hidden"
            >
              <AspectRatio ratio={6/5}>
              <Image
                src={image}
                alt={`Tour image ${index + 2}`}
                width={680}
                height={510}
                className="object-cover rounded-sm w-full h-full hover:scale-110 transition duration-500"
              />
              </AspectRatio>
            </div>
          ))}
           {remainingImagesCount > 0 && (
                        <div className="cursor-pointer relative rounded-2xl overflow-hidden" onClick={openModal.bind(this, maximumVisibleImages)}>
                          <AspectRatio ratio={6/5}>
                            <Image
                                src={images[maximumVisibleImages - 1]}
                                alt={`Tour image ${maximumVisibleImages}`}
                                width={680}
                                height={510}
                                className='object-cover rounded-sm w-full h-full'
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
                src={images[currentPhotoIndex]}
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
                  {currentPhotoIndex + 1}/{images.length}
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
