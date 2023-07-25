import admin from "@/fireBase/fireBaseAdmin";
import { NextResponse } from "next/server";
const db = admin.firestore();

export async function GET(){
   const snapshot = await db.collection('users').get()
   const users = snapshot.docs.map((user) => {
    const { name} = user.data()
    return {name}
   })
    return NextResponse.json(users)
}
