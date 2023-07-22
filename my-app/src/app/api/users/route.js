import firestore from "@/fireBase/fireBaseAdmin";
import { NextResponse } from "next/server";
export async function GET(){
   const snapshot = await firestore.collection('users').get()
   const users = snapshot.docs.map((user) => {
    const { name} = user.data()
    return {name}
   })
    return NextResponse.json(users)
}
