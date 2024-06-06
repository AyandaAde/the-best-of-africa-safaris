import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    searchQuery,
    adultCount,
    childrenCount,
    infantCount,
    guests,
    startDate,
    endDate,
  } = await req.json();

  try {
    const searchResults = await prisma.tour.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });
    console.log(searchResults);
    return NextResponse.json(searchResults);

  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 400 });
  }

  return new NextResponse("Hi", { status: 200 });
}
