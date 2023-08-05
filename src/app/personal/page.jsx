import PersonalCard from "@/components/PersonalCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getUser } from "@/services/users";
export default async function Personal(){
    const session = await getServerSession(authOptions);
    const user = await getUser(session?.user.id).data
    console.log(user);
    console.log(session?.user.id);
    return (
        <div className="flex flex-col items-center m-4">
            <p className="m-2">Personal</p>
            <PersonalCard  user={user}/>
        </div>
    )
}