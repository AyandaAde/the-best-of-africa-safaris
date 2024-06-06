import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {bookingId, tourId, userId, rating, review} = await req.json();

    const reviews = await prisma.review.findFirst({
        where: {
            bookingId,
        },
    });

    const user = await prisma.user.findUnique({
        where: {
            userId,
        },
    });

    if(!user) return NextResponse.redirect("/sign-in");

    try {
        if (reviews) {
            await prisma.review.update({
                where: {
                    id: reviews.id,
                },
                data: {
                    rating,
                    review
                },
            });
        } else {
            await prisma.review.create({
                data: {
                    bookingId,
                    tourId,
                    userId: user.id,
                    rating,
                    review
                },
            });
        };

        return new NextResponse("Review submitted.");
    } catch (error) {
        console.log(error);
        return new NextResponse("Error submitting review", {status: 400});
    }
}