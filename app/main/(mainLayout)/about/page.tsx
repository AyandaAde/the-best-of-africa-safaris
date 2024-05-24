"use client";

import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-revewal";
import { WobbleCard } from "@/components/ui/wobble-card";
import Testimonials from "@/components/Testimonials";

export default function AboutPage() {
  const images = [
    "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
  ];

  const team = [
    {
        image: "https://demo.artureanec.com/html/wild-world/img/team_1.jpg",
        name: "Modest Bayo",
        title: "Founder and CEO",
    },
    {
        image: "https://demo.artureanec.com/html/wild-world/img/team_4.jpg",
        name: "Chris Patt",
        title: "Reservation Manager",
    },
    {
        image: "https://demo.artureanec.com/html/wild-world/img/team_2.jpg",
        name: "Ayanda Kinyambo",
        title: "Software Engineer",
    }, 
    {
        image: "https://demo.artureanec.com/html/wild-world/img/team_3.jpg",
        name: "Martin Harix",
        title: "Tour Guide",
    }, 
  ];

  const content = [
    {
      heading: "Who we are",
      title1: "Where we",
      title2: "Began",
      description: `Our journey began September 2004 when our founder Modest Hello
        Bayo, fell in love with the untamed beauty of Tanzania's
        wilderness.
        This passion ignited a lifelong commitment to preserving the
        natural wonders of this land and share its wonders with the
        world. Today, The Best of Africa Safaris continues to uphold this legacy by
        offering you the most authentic and immersive safari experiences.`,
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1689479665481-1c891748e8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      heading: "Our Mission",
      title1: "Sustainable Journeys,",
      title2: "Unforgettable Memories",
      description: `
        Our mission is to provide our clients with exceptional travel 
        experiences in Tanzania. We aim to showcase the country’s 
        natural beauty, cultural richness, and unique wildlife through
         sustainable and responsible tourism practices. Our team of 
         knowledgeable and experienced travel experts is committed to
          delivering personalized service and creating memorable 
          journeys that exceed our clients’ expectations. We strive to
           be a leading travel agency in Tanzania, promoting 
           conservation and social responsibility while contributing 
           Fto the growth of the local economy.
        `,
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1689479665413-e954e8a36240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      heading: "Our Vision",
      title1: "Dream Trips",
      title2: "Sustainable Impacts",
      description: `
        Our vision is to be the premier travel agency in Tanzania, 
        renowned for our exceptional service, sustainable tourism 
        practices, and commitment to promoting the country’s 
        natural and cultural heritage. We aim to be the go-to 
        agency for travelers seeking unique and unforgettable 
        experiences in Tanzania, delivered with the highest 
        standards of professionalism and care. We envision a future 
        where our agency is a key contributor to the growth and 
        development of the tourism industry in Tanzania, while also 
        promoting environmental conservation and community empowerment. 
        Through our passion for travel and dedication to our clients, 
        we strive to make Tanzania a top destination for travelers 
        around the world
        `,
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661915734413-d1378996e656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
      ),
    },
    {
      heading: "24/7 Support",
      title1: "Immediate Support",
      title2: "Total Care",
      description: `
      Our customer service is legendary. We’re passionate about travel
       and we love helping you put together a journey you’ll remember 
       for a lifetime. Our reservation agents are there to help you 
       throughout the whole booking process. Once you’re on your trip, 
       we have a dedicated emergency line that is manned 24/7, not by
        an answering service, but by our managers in Tanzania, who know 
        what to do to help you (even if it’s in the middle of the night). 
        When you book your safari with The Best of Africa Safaris, you have a team 
        watching out for you no matter where you go.
      `,
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1526226244945-39c5d1d9e61a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFuemFuaWElMjBzYWZhcmklMjBnaXJhZmZlc3xlbnwwfHwwfHx8MA%3D%3D"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
      ),
    },
  ];

  return (
    <>
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
          <Button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Book a Tour Now →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#024034] to-transparent" />
          </Button>
        </motion.div>
      </ImagesSlider>
      <div className="p-10">
        <StickyScroll content={content} />
      </div>
      <div className="flex flex-col w-3/4 mx-auto items-start my-20 md:mb-40">
        <div className="flex flex-row items-center">
          <div className="border border-primary border-1 w-9 mr-2" />
          Team
        </div>
        <h2 className="text-4xl">
              <span className="font-semibold uppercase font-chillax">The Best of Africa</span> TEAM
            </h2>
            <div className="flex flex-row justify-center mt-8 flex-wrap gap-10">
                {team.map((member, index) => (
                    <WobbleCard
                    key={index}
                    containerClassName="w-[250px] md:w-[300px] shadow-md min-h-[300px]"
                    >
                        <Image
                        src={member.image}
                        alt={member.name}
                        width={500}
                        height={500}
                        className="mb-5 rounded-2xl"
                        />
                        <h2 className="font-semibold mx-2">{member.name}</h2>
                        <p className="mx-2">{member.title}</p>
                    </WobbleCard>
                ))}
            </div>
      </div>
      <Testimonials/>
      <div className="mb-20 md:mb-40"/>
    </>
  );
}
