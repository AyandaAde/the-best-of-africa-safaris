import { NextResponse } from "next/server";


export async function POST(){
    console.log("Hi from the bookings page.");
    return new NextResponse("Hi from the bookings page.");
}