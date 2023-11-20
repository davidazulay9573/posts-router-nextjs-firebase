import { NextResponse } from "next/server";
import { headers } from "next/headers";
import messageNotificFormat from "@/utils/messageNotifcFormat";
import admin from "@/fireBase/fireBaseAdmin";

const db = admin.firestore();

export async function GET(req) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
 try {
   const userReceives = req.nextUrl.searchParams.get("user-receives");
   const snapshot = await db
     .collection("notifications")
     .where("userReceives", "==", userReceives)
     .get();
   const notifications = snapshot.docs
     .map((doc) => {
       return {
         id: doc.id,
         ...doc.data(),
       };
     })
     .sort((a, b) => {
       return b.createdAt - a.createdAt;
     });

   return NextResponse.json(notifications);
 } catch (error) {
  return new Response(error,{status:500})
 }
 
}

export async function POST(req) {
  const secret = headers().get("secret");
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return new Response("Invalid secret", { status: 402 });
  }
  try {
    const { userSender, userReceives, type, link } = await req.json();
    const newNotification = {
      userReceives,
      userSender,
      link,
      message: messageNotificFormat(type),
      createdAt: Date.now(),
      isReaded: false,
    };

    const notification = await db
      .collection("notifications")
      .doc()
      .set(newNotification);

    return NextResponse.json(notification);
  } catch (error) {
    return new Response(error, { status: 500 });
    
  }
  
}