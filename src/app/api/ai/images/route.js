
import {generateImagAI, createFile} from "@/open-ai/generateImageAI";
import { uploadImageServer } from "@/fireBase/upLoadFileServer";
import { headers } from "next/headers";
export async function POST(req){
 const secret = headers().get("secret");
 if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
   return new Response("Invalid secret", { status: 402 });
 }

   const { prompt ,imagePath} = await req.json();
   if (!prompt) {
     return new Response("Must provide prompt", { status: 401 });
   }
   const url = await generateImagAI(prompt, imagePath);
   return new Response(url);

}

export async function PUT(req){
  const {url, imagePath } = await req.json();
  const path = await createFile(url,imagePath)
  const newUrl = await uploadImageServer(path);
  
   return new Response(newUrl) 
}

