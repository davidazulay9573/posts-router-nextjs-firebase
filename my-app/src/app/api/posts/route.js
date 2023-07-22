import { NextResponse } from "next/server";
import firestore from "@/fireBase/fireBaseAdmin";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
  const session = await getServerSession(authOptions)
  const body = await request.json();

  const newPost = { ...body, userUp: session.user.id, likes: [], comments: [] };
  const post =  await firestore.collection("posts").doc().set(newPost);
  
  return NextResponse.json(post);
}
