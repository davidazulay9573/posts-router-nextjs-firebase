import { NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  const { userId } = context.params;
  const user = await db.collection("users").doc(userId).get();

  const snapshot = await db
    .collection("posts")
    .where("userUp", "==", userId)
    .get();
  const posts = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return NextResponse.json({ user: { id: user.id, ...user.data() }, posts });
}

export async function PUT(request, context) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  const user = await request.json();
  const { userId } = context.params;
  const response = await db.collection("users").doc(userId).set(user);
  
  return NextResponse.json(response);
}
