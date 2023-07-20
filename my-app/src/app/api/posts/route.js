import { NextResponse } from "next/server";
import firestore from "@/fireBase/fireBaseAdmin";

export async function GET() {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map((doc) => {
    const { title, body } = doc.data();
    return {
      id: doc.id,
      title,
      body,
    };
  });
  return NextResponse.json(posts);
}

export async function POST(request) {
  
  const body = await request.json();
  const post =  await firestore.collection("posts").doc().set(body);
  
  return NextResponse.json(post);
}
