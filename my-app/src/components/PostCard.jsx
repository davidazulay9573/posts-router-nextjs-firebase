'use client'
import Link from "next/link";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  updatePost, deletePost } from "@/services/posts";
import LikeIcon from "./common/LikeIcon";
import CommentIcon from "./common/CommentIcon";

export default function PostCard({post}) {
  const router = useRouter();
  const { data:session } = useSession();
  const { id} = post;
  const [likes, setLikes] = useState(post.likes);
  const isLiked = () => {
     return likes.some((like) => like.id == session?.user.id);
   };
  const [targetLike, setTargetLike] = useState(
    isLiked() ? '': 'none'
  );
  const [numbersLiked, setNumbersLiked] = useState(post.likes.length);
  useEffect(() => {
    if (session) {
      setLikes(post.likes);
      setTargetLike(isLiked() ? "" : "none");
      setNumbersLiked(likes.length);
    }
}, [post.likes, session]);
  
  const addOrSubLike = async () => {
    if (!isLiked()) {
      const newLike = [...likes, session.user];
      setLikes(newLike); 
      await updatePost(id, {
        ...post,
        likes: newLike,
      });
      setTargetLike('')
      setNumbersLiked(newLike.length);

    } else {
      const newLikes = likes.filter((like) => like.id != session.user.id);
      setLikes(newLikes); 
      await updatePost(id, {
        ...post,
        likes: newLikes,
      });
      setTargetLike("none");
      setNumbersLiked(newLikes.length);  
    };
  };

  return (
    <div className="w-full max-w-lg rounded-md shadow-md overflow-hidden">
      <img
        className="h-56 w-full object-cover"
        alt="Post cover"
        src={post.imageUrl}
      />
      <Link href={`/posts/${post.id}`} className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{post.title}</h3>
        <p className="text-gray-500">{post.body}</p>
      </Link>
      <div className="flex items-center justify-around px-5 py-2">
        <button onClick={addOrSubLike} className="flex items-center">
          <LikeIcon targetLike={targetLike} />
          {numbersLiked}
        </button>
        <Link href={`/posts/${post.id}`}><p className="flex m-1"><CommentIcon/> {post.comments.length}</p> </Link> 
      </div>
    </div>
  );
}
