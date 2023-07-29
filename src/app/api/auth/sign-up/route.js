import admin from "@/fireBase/fireBaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request){
    const {email , password} = await request.json();
     try {
        await admin.auth().createUser({
         email,
         password,
       });
        return NextResponse.json({ result:{email,password}});
     } catch (error) {
        return new NextResponse( error.message , { status: 402 });
     }
}
