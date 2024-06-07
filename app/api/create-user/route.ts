import { prisma } from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const url = req.nextUrl.clone();

  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  try {
    const { id, firstName, lastName, imageUrl, emailAddresses } = user!;

    const dbUser = await prisma.user.findUnique({ where: { userId: id } });
    if (!dbUser) {
      await prisma.user.create({
        data: {
          userId: id,
          fName: firstName,
          lName: lastName,
          email: emailAddresses[0].emailAddress,
          image: imageUrl,
        },
      });
    };
    url.pathname = "/";
    return NextResponse.redirect(url);
  } catch (error) {
    console.log(error);
    return new NextResponse("Unable to create user.", { status: 400 });
  }
}
