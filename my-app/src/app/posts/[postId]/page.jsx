import { getPost ,deletePost} from "@/services/posts";
export default async function Post(props){
   const { postId } = props.params;
   const {title ,body}  = await getPost(postId);

   
    return (
      <div>
        <p>{postId}</p>
   
        <p>{title}</p>
        <p>{body}</p>

        {/* <button onClick={async () => {await deletePost(postId) ;window.location.href = 'p'}}> </button> */}
      </div>
    );
}