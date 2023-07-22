import { getUsers } from "@/services/users"
export default async function Users(){
    const users = await (await getUsers()).data
    console.log(users);
 return(
   <div className="m-4 items-center text-center ">
    {
        users.map((user) => {
            return <p>{user.name}</p>
        })
   }
     users
  </div>
 ) 

}