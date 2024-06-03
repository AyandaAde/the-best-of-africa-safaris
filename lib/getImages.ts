import { prisma } from "./db/prisma";

export async function getImages(slug: string){
    const data = await prisma.tour.findFirst({where: {slug}});
    const images = data?.images;
    return images;
}