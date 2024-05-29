import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {about} = await req.json();
    console.log(about);
    return new NextResponse("User profile edited.");
}