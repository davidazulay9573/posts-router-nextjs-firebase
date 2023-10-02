import PersonalCard from "@/components/PersonalCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getUser, getUsers } from "@/services/users";
import PostCard from "@/components/PostCard";
import { PencilAltIcon} from "@heroicons/react/solid";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Personal(){
    const session = await getServerSession(authOptions);
    const usersId = await (
      await getUsers()
    ).data.map((user) => {
      return user.id;
    });

    if (!usersId.includes(session?.user.id)) {
      redirect("/users");
    }
    const {user, posts} = (await getUser(session?.user.id)).data
   
    return (
        <div className="flex flex-col items-center m-4">
            {user && <PersonalCard user={user}/>}
            {posts.map(post => {return (
              <>
                <PostCard key={post.id} post={post} />
                <div className="flex space-x-4 mt-4">
                  <Link href={`/personal/${post.id}`} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <PencilAltIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Edit
                  </Link>
                </div>
              </>
            ); })}
        </div>
    )
}

