import { NextResponse } from "next/server";


export function POST(req: Request){
    console.log("Hi");
    return new NextResponse("Hi", {status: 200});
}