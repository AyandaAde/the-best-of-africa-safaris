
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";
import TourWobbleCard from "@/components/TourWobbleCard";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db/prisma";

export default async function ToursPage() {
  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
  ];

    const tours = await prisma.tour.findMany({
      orderBy: {
        id: "desc",
      },
    });

  return (
    <div>
      <ImageSlider images={images}/>
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
          {tours?.map((tour: any, index: number) => (
            <TourWobbleCard key={index} tour={tour}/>
          ))}
        </div>
      </div>
    </div>
  );
};