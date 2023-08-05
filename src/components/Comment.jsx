'use client'
import LikeIcon from "./LikeIcon";
import dateFormat from "@/utils/dateFormat";
import Link from "next/link";

function Comment({ comment, isCommentLiked, handleLikeComment }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
      <Link href={`/users/${comment.userUp.id}`}>
        <img
          className="rounded-full h-8 w-8 mr-2 mt-1 "
          src={comment.userUp.image}
        />
      </Link>
      <div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
          <div className="font-semibold text-sm leading-relaxed">
            {comment.userUp.name}
          </div>
          <div className="text-normal leading-snug md:leading-normal">
            {comment.content}
          </div>
        </div>
        <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
          {dateFormat(new Date(comment.createdAt))}
        </div>
        <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
          <span className=" flex items-center space-x-2 text-purple-600 text-sm ml-1 pr-1.5 text-gray-500 ">
            {comment.likes.length}
            <button onClick={() => handleLikeComment(comment.id)}>
              <LikeIcon size={18} targetLike={isCommentLiked(comment.id) ? "" : "none"} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;