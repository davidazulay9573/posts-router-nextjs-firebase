'use client'
import Link from "next/link";
import { useState } from "react";
import dateFormat from "@/utils/dateFormat";
import UserSimpleCard from "./UserSimpleCard";
import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import Comments from "./Comments";
import usePost from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import useSpicificUser from "@/hooks/useSpecificUser";

export default function PostCard( { post } ) {
  const {data:session} = useSession();
  const userUp = useSpicificUser(post.userUp);
  const [
    likes,
    comments,
    isPostLiked,
    handleLikePost,
    isCommentLiked,
    handleLikeComment,
    addCommentToPost,
  ] = usePost(post);
  
  const [commentView, setCommentsView] = useState(false);
  const [likesView, setLikesView] = useState(false);
 
 return (
   <>
     <div className="w-full max-w-lg mx-auto mt-4 bg-white p-6 rounded-md shadow-md overflow-hidden">
       <div className="border-b border-gray-200 mb-4">
         <div className="flex justify-between items-center text-gray-500 font-semibold m-1">
           <div className="m-1">{dateFormat(post.createdAt)}</div>

           <Link
             href={
               session?.user.id == post.userUp
                 ? "/personal"
                 : `/users/${post.userUp}`
             }
           >
             <img
               className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
               src={userUp?.image}
             />
           </Link>
         </div>
       </div>

       <Link
         href={`/posts/${post.id}`}
         className="px-5 py-3 flex flex-col justify-center items-center"
       >
         <h3 className="text-gray-700 uppercase text-center text-lg">
           {post.title}
         </h3>
         <p
           className="text-gray-500 text-center"
           style={{ whiteSpace: "pre-wrap" }}
         >
           {post.body}
         </p>
       </Link>
       <div className="flex items-center justify-around px-5 py-2 mt-4 border-t border-gray-200">
         <span className="flex items-center space-x-2 text-purple-600">
           <button onClick={handleLikePost}>
             <HeartIcon
               className={`h-6 w-6 ${
                 isPostLiked() ? "text-red-500 fill-current" : "text-gray-200"
               }`}
               aria-hidden="true"
             />
           </button>
           <button
             onClick={() =>
               setLikesView((likesView) => !likesView, setCommentsView(false))
             }
           >
             {likes.length}
           </button>
         </span>

         <button
           onClick={() => {
             setCommentsView(
               (commentView) => !commentView,
               setLikesView(false)
             );
           }}
           className="flex items-center space-x-2 text-purple-600"
         >
           <ChatIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
           <span>{comments.length}</span>
         </button>
       </div>
     </div>
     <div className="mt-4">
       {commentView && (
         <Comments
           comments={comments}
           addCommentToPost={addCommentToPost}
           isCommentLiked={isCommentLiked}
           handleLikeComment={handleLikeComment}
         />
       )}
       {likesView &&
         likes.map((likeId) => {
           return <UserSimpleCard key={likeId} userId={likeId} />;
         })}
     </div>
   </>
 );
     
}
