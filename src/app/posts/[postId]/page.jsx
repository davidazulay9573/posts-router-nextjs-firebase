import { getPost } from "@/services/posts";
import PostCard from "@/components/PostCard";

export default async function Page({params}){
  
   const { postId } = params;
   const post = (await getPost(postId)).data;
  
    return (
      <div className="flex flex-col items-center justify-center space-y-6 m-4">
        <PostCard key={post.id} post={post} />
      </div>
    );
}