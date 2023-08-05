import PersonalCard from "@/components/PersonalCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getUser } from "@/services/users";
import PostCard from "@/components/PostCard";
export default async function Personal(){
    const session = await getServerSession(authOptions);
    
    const {user,posts} = (await getUser(session?.user.id)).data
 
    return (
        <div className="flex flex-col items-center m-4">
            {user && <PersonalCard user={user}/>}

            {posts.map(post => {return <PostCard key={post.id} post={post}/>})}
        </div>
    )
}