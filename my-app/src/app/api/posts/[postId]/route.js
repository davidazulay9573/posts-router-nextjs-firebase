import { NextResponse } from "next/server";
import firestore from "@/fireBase/fireBaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(
  request,
  context 
) {
  const { postId } = context.params;
  const post = await firestore.collection("posts").doc(postId).get();
  
     return NextResponse.json({id: post.id ,...post.data() });
}

export async function DELETE(request,context){
   const {postId} = context.params;
   const response = await firestore.collection('posts').doc(postId).delete()

   return NextResponse.json(response)
}

export async function PUT(request,context){
  const {postId} = context.params;
}

