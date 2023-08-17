import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(request) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
 
  const snapshot = await db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get();
  const posts = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return NextResponse.json(posts);
}

export async function POST(request) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  const body = await request.json();
  const newPost = {
    ...body,
    createdAt: Date.now(),
    rating: 0,
    likes: [],
    comments: [],
  };
  const post = await db.collection("posts").doc().set(newPost);

  return NextResponse.json(post);
}
