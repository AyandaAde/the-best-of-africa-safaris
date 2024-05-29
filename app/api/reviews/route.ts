import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {tourId, rating, review} = await req.json();

    console.log(tourId, rating, review);
    return new NextResponse("Review submitted.");
}