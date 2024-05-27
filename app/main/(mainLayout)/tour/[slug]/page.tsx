import BookTourCta from "@/components/BookTourCta";
import ReviewComp from "@/components/ReviewComp";
import TourGallery from "@/components/TourGallery";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function page() {
  const tourActivities = [
    { name: "Game Drive", icon: "fa-truck-field" },
    { name: "Airport Transfer", icon: "fa-plane-arrival" },
    { name: "Suitable for Solo Travelers", icon: "fa-person-walking-luggage" },
    { name: "Private Tour", icon: "fa-user-tie" },
  ];
  return (
    <div className="pt-28">
      <TourGallery />
      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-7 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-3xl">
                Tour Name Goes Here
              </h2>
              <Separator className="mt-11"/>
              <div className="my-11">
                <h2 className="font-bold text-2xl mb-2">
                  Tour Activities and Features
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {tourActivities.map((activity, index) => (
                    <div key={index} className="flex items-center md:my-0 my-1">
                      <i className={`fa-solid fa-xl ${activity.icon}`} />
                      <p className="text-sm md:text-base ml-2">
                        {activity.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-11"/>
              <div className="mb-11">
                <h2 className="font-bold text-2xl mb-2">Description</h2>
                <p>
                  {" "}
                  Embark on an unforgettable adventure in the heart of Tanzania:
                  The Serengeti Safari Tour Imagine yourself traversing the vast
                  plains of the Serengeti National Park, the jewel of Tanzania's
                  wildlife crown. Our Serengeti Safari Tour promises an
                  immersive experience unlike any other, bringing you
                  face-to-face with Africa's magnificent creatures.
                </p>
                <h2 className="font-bold text-lg mt-3">
                  Explore the Realm of the Big Five:
                </h2>
                <p>
                  Our expert guides will lead you on thrilling game drives,
                  searching for the legendary Big Five: lions, leopards,
                  elephants, buffalo, and rhinos. Witness these majestic animals
                  in their natural habitat, from the stalking prowess of a
                  lioness to the gentle giants lumbering across the savanna.
                </p>
                <h2 className="font-bold text-lg mt-2">
                  Witness the Great Migration:
                </h2>
                <p>
                  Time your safari right, and you might be lucky enough to
                  witness the awe-inspiring Great Migration. This natural
                  spectacle sees millions of wildebeest and zebra thundering
                  across the plains in a relentless pursuit of fresh pastures.
                  It's a testament to the raw power and resilience of nature.
                </p>
                <h2 className="font-bold text-lg mt-2">
                  Choose Your Comfort Level:
                </h2>
                <p>
                  We offer a variety of safari packages to suit your
                  preferences. Stay in luxurious lodges with all the amenities
                  or opt for a more rustic tented camp experience, allowing you
                  to truly connect with the wilderness.
                </p>
                <h2 className="font-bold text-lg mt-2">
                  More Than Just Wildlife:
                </h2>
                <p>
                  The Serengeti isn't just about the animals. Immerse yourself
                  in the breathtaking landscapes, from the golden grasslands
                  dotted with acacia trees to the dramatic rock formations
                  called kopjes. Learn about the park's rich ecosystem and the
                  ongoing conservation efforts.
                </p>
                <h2 className="font-bold text-lg mt-2">
                  Memories that Last a Lifetime:
                </h2>
                <p>
                  This safari tour is more than just a vacation; it's an
                  unforgettable adventure that will leave you with breathtaking
                  memories and a newfound appreciation for the natural world.
                </p>
                <p>Book your dream Serengeti Safari Today!</p>
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
          <div className="md:col-span-5 rounded-xl shadow-xl dark:shadow dark:shadow-white sticky top-32 h-fit overflow-auto">
              <BookTourCta discount={10} price={500}/>
            </div>
        </div>
      </div>
    </div>
  );
}
