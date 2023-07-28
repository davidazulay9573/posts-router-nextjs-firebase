import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updatePost, deletePost } from "@/services/posts";
import { v4 as uuid } from "uuid";

function usePost(post, comment) {
  const { data: session } = useSession();

  const [likes, setLikes] = useState(comment.likes);
  const [comments, setComments] = useState(comment.comments);

  useEffect(() => {
    if (session) {
      setLikes(comment.likes);
      setComments(comment.comments);
    }
  }, [comment.likes, comment.comments, session]);

  function isLiked(likes) {
    return likes.some((like) => like.id == session?.user.id);
  }
  async function handleLike() {
    if (!isLiked(likes)) {
      const newLikes = [...likes, session.user];
      await updatePost(post.id, {
        ...post,
        comments:[]
        
      });
      setLikes(newLikes);
    } else {
      const newLikes = likes.filter((like) => like.id != session.user.id);

      await updatePost(post.id, {
        ...post,
        likes: newLikes,
      });

      setLikes(newLikes);
    }
  }

  async function addComment(comment) {
    const newComments = [
      ...comments,
      {
        id: uuid(),
        userUp: session.user.id,
        createdAt: new Date().getTime(),
        content: comment,
        likes: [],
        comments: [],
      },
    ];
    await updatePost(post.id, {
      ...post,
      comments: newComments,
    });
    setComments(newComments);
  }

  return [likes, comments, isLiked, handleLike, addComment];
}
export default usePost;
