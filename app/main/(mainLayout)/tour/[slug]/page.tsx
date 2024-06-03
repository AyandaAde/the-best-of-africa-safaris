import BookTourCta from "@/components/BookTourCta";
import ReviewComp from "@/components/ReviewComp";
import TourGallery from "@/components/TourGallery";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db/prisma";

export default async function Tour({params}: {params: {slug: string}}) {
    const slug = params.slug;

  const tour = await prisma.tour.findFirst({where: {slug}});
  
  return (
    <div className="mb-10 md:mb-20 md:pt-28">
      <TourGallery images={tour?.images!} />
      <div className="container mx-auto mt-8 md:mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-7 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-3xl">
                {tour?.name}
              </h2>
              <Separator className="mt-5 md:mt-11"/>
              <div className="my-5 md:my-11">
                <h2 className="font-bold text-xl md:text-2xl mb-2">
                  Tour Activities and Features
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {tour?.activities.map((activity, index) => (
                    <div key={index} className="flex items-center md:my-0 my-1">
                      <i className={`fa-solid md:fa-xl ${activity.icon}`} />
                      <p className="text-sm md:text-base ml-2">
                        {activity.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-5 md:my-11"/>
              <div className="mb-5 md:mb-11">
                <h2 className="font-bold text-xl md:text-2xl mb-2">Description</h2>
                <p className="text-sm">
                  {" "}
                  Embark on an unforgettable adventure in the heart of Tanzania:
                  The Serengeti Safari Tour Imagine yourself traversing the vast
                  plains of the Serengeti National Park, the jewel of Tanzania&apos;s
                  wildlife crown. Our Serengeti Safari Tour promises an
                  immersive experience unlike any other, bringing you
                  face-to-face with Africa&apos;s magnificent creatures.
                </p>
                {tour?.description.map((paragraph, index)=>(
                  <div key={index}>
                      <h2 className="font-bold text-base md:text-lg mt-3">
                        {paragraph.heading}
                  </h2>
                  <p className="text-sm">
                    {paragraph.text}
                  </p>
                  </div>
                ))}
                <p className="mt-2 text-sm md:text-base">Book your dream Serengeti Safari Today!</p>
              </div>
              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">
                    Customer Reviews
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ReviewComp />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-5 rounded-xl shadow-xl dark:shadow dark:shadow-white sticky top-32 h-fit overflow-auto">
              <BookTourCta discount={10} price={500}/>
            </div>
        </div>
      </div>
    </div>
  );
}
