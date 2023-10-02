import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(){
   const secret = headers().get("secret");
   if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
     return new Response("Invalid secret", { status: 402 });
   }
   try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return NextResponse.json(users);
    
   } catch (error) {
    return new Response(error, { status: 500 });
    
   }
   
}



