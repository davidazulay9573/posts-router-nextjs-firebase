import { getUsers } from "@/services/users";
import UserSimpleCard from "@/components/UserSimpleCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Users() {
  const session = await getServerSession(authOptions);
  const users = await (await getUsers()).data;
 
  return (
    <div className="m-4 items-center text-center ">
      {users
        .filter((user) => user.id !== session?.user.id)
        .map((user) => {
          return <UserSimpleCard key={user.id} user={user} />;
        })}
    </div>
  );
}
