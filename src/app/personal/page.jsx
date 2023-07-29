import PersonalCard from "@/components/PersonalCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
export default async function Personal(){
    const session = await getServerSession(authOptions);
    return (
        <div className="flex flex-col items-center m-4">
            <p className="m-2">Personal</p>
            <PersonalCard  user={session?.user}/>
        </div>
    )
}