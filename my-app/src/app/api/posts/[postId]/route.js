import { NextResponse } from "next/server";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(
  request,
  context 
) {
  try {
    const { postId } = context.params;
    const post = await db.collection("posts").doc(postId).get();

    return NextResponse.json({ id: post.id, ...post.data() });
  } catch (error) {
    console.error(error);
  }
  
}

export async function PUT(request,context){
  const post = await request.json();
  const newPost = {...post, rating: (post.likes.length + (post.comments.length * 2)) }
  const {postId} = context.params;
  const response = await db.collection('posts').doc(postId).set(newPost);
  
  return NextResponse.json(newPost)
}

export async function DELETE(request,context){
   const {postId} = context.params;
   const response = await db.collection('posts').doc(postId).delete()

   return NextResponse.json(response)
}
