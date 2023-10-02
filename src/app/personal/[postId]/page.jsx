import FormEditPost from "@/components/FormEditPost";
import { getPost } from "@/services/posts";

export default async function EditPost({params}){
  
   const {postId } = params;
   const {post} = (await getPost(postId)).data;
  

   return (
     <div className="bg-white shadow-sm p-4 rounded-lg">
       <FormEditPost post={post} />
      
     </div>
   );
}