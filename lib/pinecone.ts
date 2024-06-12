import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { convertToAscii } from "./utils";

const pc = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
});

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
};

export async function loadS3IntoPinecone(file_key: string) {
  //* 1. Obtain the pdf
  console.log("Downloading s3 into file system");
  const file_name = await downloadFromS3(file_key);
  if (!file_name) throw new Error("Could not download from s3");

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  //* 2. Split and segment the  pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  //* 3. Vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocuments));
  console.log("Vectors", vectors);

  //* Upload to pinecone
  const pineconeIndex = pc.index("the-best-of-africa-safaris");
  console.log("Inserting vectores into pinecone");
  const namespace = convertToAscii(file_key);

  //@ts-ignore
  pineconeIndex.namespace(namespace).upsert(vectors);
  console.log("Inserted vectors into pinecone");
  return documents[0];
  
}

export function truncateStringByBytes(str: string, bytes: number) {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
}

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  //* Split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
};

async function embedDocuments(doc: Document){
    try {
        console.log(doc.pageContent);
        const embeddings = await getEmbeddings(doc.pageContent); 
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber,
            },
        } as Vector;
    } catch (error) {
        console.log("Error embedding the documents", error);
        throw error;
    }
}
