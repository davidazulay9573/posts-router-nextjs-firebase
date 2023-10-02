import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";
import { getPosts } from "@/services/posts";

const db = admin.firestore();

export async function GET(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try { 
    const { userId } = context.params;
    const user = await db.collection("users").doc(userId).get();
    const posts = (await getPosts(`/posts/?user-id=${userId}`)).data
     
    return NextResponse.json({ user: { id: user.id, ...user.data()}, posts });
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
}

export async function PUT(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
    const user = await request.json();
    if(!user){
      return new Response('Must provide user')
    }
    const { userId } = context.params;
    const response = await db.collection("users").doc(userId).set(user);

    return NextResponse.json(response);
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
  
}
