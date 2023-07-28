import { NextResponse } from "next/server";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();
export async function GET() {
 
  const snapshot = await db
     .collection("posts")
     .orderBy('createdAt','desc')
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
  const body = await request.json();
  const newPost = { ...body, createdAt:new Date().getTime(), rating: 0, likes: [], comments: [] };
  const post =  await db.collection("posts").doc().set(newPost);
  
  return NextResponse.json(post);
}

