import { getPost ,deletePost} from "@/services/posts";
import PostCard from "@/components/PostCard";
import Comments from "@/components/Comments";
import Form from "@/components/Form";

export default async function Post(props){

  const { postId } = props.params;
   const post = (await getPost(postId)).data;
  
    return (
      <div className="flex flex-col items-center justify-center space-y-6 m-4">
        
          <PostCard post={post} />
          <Comments comments={[post.comments]}></Comments>
       

        {/* <button onClick={async () => {await deletePost(postId) ;window.location.href = 'p'}}> </button> */}
      </div>
    );
}