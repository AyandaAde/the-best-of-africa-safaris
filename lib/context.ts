import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";


export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string){
    const pc = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    });
    const index = pc.Index("the-best-of-africa-safaris");

    try {
        const namespace = convertToAscii(fileKey);
        
        const queryResult = await index.namespace(namespace).query({
            vector: embeddings,
            topK: 5,
            includeMetadata: true,
        });

        return queryResult.matches || [];
    } catch (error) {
        console.log("Error querying embeddings", error);
        throw error; 
    };
};

type Metadata = {
    text: string;
    pageNumber: number;
};

export async function getContext(query: string, fileKey: string){
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches.filter((match)=> match.score && match.score > 0.7);

    let docs = qualifyingDocs.map((match)=>(match.metadata as Metadata).text);

    return docs.join("/n").substring(0, 3000);
}