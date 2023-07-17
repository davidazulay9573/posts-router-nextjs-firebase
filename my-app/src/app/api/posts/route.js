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

export async function POST(request, response) {
  const body = await request.json();
   if (body.title && body.body) {
     await firestore.collection("posts").doc().set(body);
   } else {
    if (body.title && body.body) {
      await firestore.collection("posts").doc().set(body);
    } else {
      return NextResponse.json({ message: "error" }).status(450);
    }
   }

  return NextResponse.json({ body });
}
