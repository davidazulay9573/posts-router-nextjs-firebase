import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";
// import { getComments } from "@/services/comments";

const db = admin.firestore();

export async function GET(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
     const { postId } = context.params;
     const post = await db.collection("posts").doc(postId).get();
    //  const comments = (await getComments(`/comments/?post-id=${postId}`)).data
    
     return NextResponse.json({post:{ id: post.id, ...post.data() } } );
    
  } catch (error) {
    return new Response(error,{status:500})
  }
 
}

export async function PUT(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
     const post = await request.json();
     const newPost = {
       ...post,
       rating: post.likes.length + post.comments.length * 2,
     };
     const { postId } = context.params;
     const response = await db.collection("posts").doc(postId).set(newPost);

     return NextResponse.json(response);
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
 
}

export async function DELETE(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
    const { postId } = context.params;
    const response = await db.collection("posts").doc(postId).delete();

    return NextResponse.json(response);
    
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
  
}
