'use client'
import Link from "next/link";
import { useState } from "react";
import dateFormat from "@/utils/dateFormat";
import LikeIcon from "./LikeIcon";
import UserSimpleCard from "./UserSimpleCard";
import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import Comments from "./Comments";
import usePost from "@/hooks/usePost";

export default function PostCard({post}) {
  
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
           <Link href={`/users/${post.userUp.id}`}>
             <img className="rounded-full h-10 w-10" src={post.userUp.image} />
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
             <LikeIcon targetLike={isPostLiked() ? "" : "none"} />
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
         likes.map((like) => {
           return <UserSimpleCard key={like.id} user={like} />;
         })}
     </div>
   </>
 );
     
}
