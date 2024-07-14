import { HeroParallax } from "@/components/ui/hero-parallax";
import { prisma } from "@/lib/db/prisma";

export default async function Hero() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const activityArray = activities.concat(activities).concat(activities);

  return <HeroParallax products={activityArray} />;
}
