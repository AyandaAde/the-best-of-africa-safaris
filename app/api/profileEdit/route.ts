import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {about, userId} = await req.json();

    const user = await prisma.user.findUnique({
        where:{
            userId,
        },
    });

    if(!user) return NextResponse.redirect("/sign-in");

    try {
        await prisma.user.update({
            where:{
                userId,
            },
            data:{
                about,
            },
        });
        return NextResponse.redirect(`/main/user/${userId}`);
    } catch (error) {
        console.log(error);
        return new NextResponse("Unable to edit user profile."); 
    }
}