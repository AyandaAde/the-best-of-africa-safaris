import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        const tours = await prisma.tour.findMany({
            orderBy: {
                id: "desc",
            },
        });

        return NextResponse.json(tours);
    } catch (error) {
        console.log(error);
        return new NextResponse("Error fetching tours", {status: 400});
    }
}