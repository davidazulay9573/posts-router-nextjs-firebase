'use client'
import Link from "next/link";
import { deletePost } from "@/services/posts";
export default function PostCard({post}) {
 
  const { id, title, body } = post;
  return (
    <li className=" text-center rounded-lg shadow-lg bg-neutral-700 m-4">
      <Link href={`/posts/${id}`}>
        <div className="p-4">
          <h4 className="text-xl text-neutral-50 font-medium">{title}</h4>
          <p className="text-neutral-300">{body}</p>
        </div>
      </Link>
      <button onClick={() => {deletePost(id)}}>delete</button>
      
    </li>
  );
}
