import Notifications from "@/components/Notifications";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page(){
    const session = await getServerSession(authOptions)
    return (
      <Notifications session={session}/>
    );
}