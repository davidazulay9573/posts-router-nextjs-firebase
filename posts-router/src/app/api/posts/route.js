import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";
import { getUser } from "@/services/users";

const db = admin.firestore();

export async function GET(req) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  
  try {
    const userId = req.nextUrl.searchParams.get("user-id");
    const userWatchingId = req.nextUrl.searchParams.get("user-watching");

    const snapshot = userId
      ? await db.collection("posts").where("userUp", "==", userId).get()
      : await db.collection("posts").get();
    
    const posts = snapshot.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
       
    if(userWatchingId){
    const userWatching = (await getUser(userWatchingId)).data;
    return NextResponse.json(posts.filter((post) => {
        return (
          userWatching.friends.includes(post.userUp) ||
          userWatching.following.includes(post.userUp) ||
          userWatching.id === post.userUp
        );
      }));

    }
    return NextResponse.json(posts);
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
    if(!body){
      return new Response('Must provide body',{status:400})
    }
    const newPost = {
      ...body,
      createdAt: Date.now(),
      rating: 0,
      likes: [],
      comments: [],
    };
    const post = await db.collection("posts").doc().set(newPost);

    return NextResponse.json(post);
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
  
}
