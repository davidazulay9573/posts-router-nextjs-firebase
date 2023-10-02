import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(req) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }

  try {
    const postId = req.nextUrl.searchParams.get("post-id");
    const snapshot = await db
      .collection("comments")
      .where('postid', "==", postId)
      .get();
    const comments = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return NextResponse.json(comments);
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

export async function POST(request) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
    const body = await request.json();
    if (!body) {
      return new Response("Must provide body", { status: 400 });
    }
    const newComment = {
      ...body,
      createdAt: Date.now(),
      rating: 0,
      likes: [],
      comments: [],
    };
    const comment = await db.collection("posts").doc().set(newComment);

    return NextResponse.json(comment);
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
