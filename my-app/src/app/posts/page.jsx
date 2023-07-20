import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard";

export const dynamic = 'force-dynamic';

export default async function Posts(){
    
   const posts = await getPosts()
   return (
     <div>
       <ul className="grid grid-cols-3 ">
         {posts.map((post) => {
           return <PostCard post={post} />;
         })}
       </ul>
     </div>
   );
 
}