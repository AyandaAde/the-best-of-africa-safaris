import { HeroParallax } from "@/components/ui/hero-parallax";
import { prisma } from "@/lib/db/prisma";

export default async function Hero() {
  const tours = await prisma.tour.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const tourArray = tours.concat(tours).concat(tours);

  return <HeroParallax products={tourArray} />;
}

