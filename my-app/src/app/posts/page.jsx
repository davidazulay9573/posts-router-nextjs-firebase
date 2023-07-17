import { getPosts } from "@/services/posts";

export const dynamic = 'force-dynamic';

export default async function Posts(){
    
   const posts = await getPosts()
   return (
     <div>
       {posts.map((post) => {
         return <p> {post.title}</p>;
       })}
     </div>
   );
 
}