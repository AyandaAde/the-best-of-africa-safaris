import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const {file_key} = await req.json();
        const pages = await loadS3IntoPinecone(file_key);
        
        return NextResponse.json({pages}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal server error"},  {status: 500});  
    }
}
