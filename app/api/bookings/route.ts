import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const DOMAIN = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN!;
const mg = mailgun.client({
  username: "api",
  key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY || "key-yourkeyhere",
});

export async function POST(req: Request) {
  const {
    activityId,
    userId,
    activityName,
    startDate,
    endDate,
    discount,
    adultCount,
    childrenCount,
    infantCount,
    guests,
    noOfDays,
    bookingPrice,
  } = await req.json();

  const user = await prisma.user.findFirst({ where: { userId } });
  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  const messageData = {
    from: "Booking from <booking@thebestofafricasafaris.com>",
    to: "ayandakay67@gmail.com",
    subject: "New Booking",
    text: `
    Hi,

    You have a new booking from ${user?.fName} ${user?.lName},
    Email: ${user?.email}
    For ${guests} guest(s)
    ${adultCount} adult(s)
    ${childrenCount !== 0 ? childrenCount + " child(ren)," : ""}
    ${infantCount !== 0 ? infantCount + " infant(s)," : ""}
    ${
      endDate === startDate
        ? "On " + startDate
        : "From " + startDate + " to " + endDate
    }
    ${
      activityName === "Volunteering"
        ? "To volunteer"
        : "For the 7 day package."
    }
    `,
  };

  try {
    await prisma.booking.create({
      data: {
        activityId,
        userId: user?.id!,
        userName: user?.fName + " " + user?.lName!,
        activityName,
        startDate,
        endDate,
        discount,
        adults: adultCount,
        children: childrenCount,
        infants: infantCount,
        guests,
        noOfDays,
        price: bookingPrice,
      },
    });

    const emailRes = await mg.messages.create(DOMAIN, messageData);
    console.log(emailRes);
    return new NextResponse("Booking successfully created.");
  } catch (error) {
    console.log(error);
    return new NextResponse("Unable to create booking", { status: 400 });
  }
}
