import { getUsers } from "@/services/users"
import {UserCard} from "@/components/UserCard"
import { getFriends } from "@/services/users.server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Users(){
   const session = await getServerSession(authOptions);
   const users = await (await getUsers()).data;
   const friends = await getFriends(session?.user.id);
  
 return(
   <div className="m-4 items-center text-center ">
    {
        users.filter(user => user.id !== session?.user.id).map((user) => {
            return <UserCard key={user.id} user={user} />
        })
    }
  </div>
 ) 

}