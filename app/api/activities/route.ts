import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetching activities", { status: 400 });
  }
}
