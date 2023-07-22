import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard";
import generatePostAI from "@/open-ai/generatePostAI";
export const dynamic = 'force-dynamic';

export default async function Posts(){
//  generatePostAI("hello", "hello").then(console.log);
   const posts = await getPosts()
   return (
 
       <ul className="items-center m-5">
         {posts.map((post) => {
           return <PostCard post={post} />;
         })}
       </ul>
     
   );
 
}