import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.review.delete({
      where: {
        id,
      },
    });

    return new NextResponse("Review successfully deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error deleting review", { status: 400 });
  }
}
