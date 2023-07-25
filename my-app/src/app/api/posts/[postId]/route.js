import { NextResponse } from "next/server";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(
  request,
  context 
) {
  const { postId } = context.params;
  const post = await db.collection("posts").doc(postId).get();
  
     return NextResponse.json({id: post.id ,...post.data() });
}

export async function PUT(request,context){
  const newPost = await request.json();
  const {postId} = context.params;
  const response = await db.collection('posts').doc(postId).set(newPost);
 
  return NextResponse.json(newPost)
}

export async function DELETE(request,context){
   const {postId} = context.params;
   const response = await db.collection('posts').doc(postId).delete()

   return NextResponse.json(response)
}
