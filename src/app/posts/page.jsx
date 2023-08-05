import { getPosts } from "@/services/posts";
import PostCard from "@/components/PostCard";
import generatePostAI from "@/open-ai/generatePostAI";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FormAddPost from "@/components/FormAddPost";


export default async function Feed(){
  const session = await getServerSession(authOptions);
   const posts = (await getPosts()).data;
   if(!session){
    return <p>You need sign-up</p>
   }
   return (
     <div className="flex flex-col items-center justify-center space-y-6">
       <FormAddPost />

       {posts.map((post) => {
         return <PostCard key={post.id} post={post} />;
       })}
     </div>
   );
}