import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();
  

  const {id, firstName, lastName, imageUrl, emailAddresses} = user!;

  const dbUser = await prisma.user.findUnique({where: {userId: id}});
    if(!dbUser){
      await prisma.user.create({
        data: {
          userId: id,
          fName: firstName,
          lName: lastName,
          email: emailAddresses[0].emailAddress,
          image: imageUrl,
        }
      })
    }

  return (
    <div className="mb-20 md:mb-40">
      <Hero />
      <div className="relative w-full bg-gradient-to-b from-white to-[#F3F5F4] dark:from-black dark:to-black text-black dark:text-white">
      <div className="pt-20 md:pt-40 w-3/4 mx-auto">
        <div className="grid md:grid-cols-[.5fr_1fr] gap-9">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center">
              <div className="border border-primary border-1 w-9 mr-2" />
              About
            </div>
            <h2 className="text-4xl">
              <span className="font-semibold font-chillax">The Best of Africa</span> Safaris
            </h2>
            <div className="w-1/2 border-2 shadow-md hover:bg-gradient-to-r hover:from-[#024034] hover:to-primary hover:border-none border-primary hover:-translate-y-1 transition duration-200 text-center rounded-sm">
              <Button
                variant={"link"}
                className="w-full text-foreground hover:text-white hover:no-underline"
              >
                <Link href="/main/about" className="w-full text-base md:text-lg">
                  Read More
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-base md:text-lg">
              Our journey began September 2004 when our founder Modest Hello
              Bayo, fell in love with the untamed beauty of Tanzania&apos;s
              wilderness.
            </p>
            <p className="text-base md:text-lg">
              This passion ignited a lifelong commitment to preserving the
              natural wonders of this land and share it&apos;s wonders with the
              world. Today, The Best of Africa Safaris continues to uphold this legacy by
              offering you the most authentic and immersive safari experiences.
            </p>
          </div>
        </div>
        <div className="relative mt-14">
          <Image
          src={"https://images.unsplash.com/photo-1430514625417-38e9c79c95c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRhbnphbmlhJTIwc2FmYXJpJTIwbGlvbnN8ZW58MHx8MHx8fDA%3D"}
          alt="Lion hunting zebra."
          width={1080}
          height={1080}
          className="rounded-md w-full h-[500px] object-cover"
          />
          <h2 className="absolute -bottom-5 md:-bottom-12 left-3 sm:left-9 font-semibold font-chillax text-5xl md:text-9xl text-[#F2AC29]">Safaris</h2>
        </div>
      </div>
      </div>
      <Image
      src={"/images/border.png"}
      alt="Border"
      width={1000}
      height={1000}
      className="relative -z-10 bottom-1 w-full h-10 md:h-auto dark:hidden"
      />
      <div className="flex flex-col justify-center items-center w-3/4 gap-3 mx-auto font-chillax my-20 my:mb-40">
        <h3 className="text-black/60 dark:text-white/60 text-base">ANIMALS</h3>
        <h2 className="text-center text-3xl md:text-5xl"><span className="font-semibold">ANIMALS YOU</span> WILL MEET</h2>
        <div className="flex flex-row justify-center flex-wrap mt-6 gap-24">
          <div className="flex flex-col items-center font-bold text-lg">
            <Image
             src={"/images/lion.png"}
             alt="Lion"
             width={100}
             height={100}
             className="w-28 h-28 object-contain"
             />
             <p>Lions</p>
          </div>
          <div className="flex flex-col items-center font-bold text-lg">
            <Image
             src={"/images/zebra.png"}
             alt="Lion"
             width={100}
             height={100}
             className="w-28 h-28 object-contain"
             />
             <p>Zebra</p>
          </div>
          <div className="flex flex-col items-center font-bold text-lg">
            <Image
             src={"/images/elephant.png"}
             alt="Lion"
             width={100}
             height={100}
             className="w-28 h-28 object-contain"
             />
             <p>Elephants</p>
          </div>
          <div className="flex flex-col items-center font-bold text-lg">
            <Image
             src={"/images/giraffe.png"}
             alt="Lion"
             width={100}
             height={100}
             className="w-28 h-28 object-contain"
              />
             <p>Giraffes</p>
          </div>
        </div>
      </div>
      <div className="relative">
      <Testimonials/>
      <Image
    src={"/images/border.png"}
    alt="Border"
    width={1000}
    height={1000}
    className="relative -bottom-44 md:-bottom-64 w-full h-16 sm:h-20 md:h-24 dark:hidden"
    />
      </div>
    </div>
  );
};

