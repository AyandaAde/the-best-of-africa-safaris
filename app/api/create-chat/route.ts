import { NextResponse } from "next/server";


export function POST(req:Request){
    console.log("Hi from the API");
    return new NextResponse("Hi from the API");
};