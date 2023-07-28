import { useState } from "react";
import { useSession } from "next-auth/react";
import { updatePost, deletePost } from "@/services/posts";
import { v4 as uuid } from "uuid";

function usePost(post, comment) {
  const { data: session } = useSession();

  const initialLikes = comment ? comment.likes : post.likes;
  const initialComments = comment ? comment.comments : post.comments 
  
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState( initialComments);
  

  const isLiked = () => {
    return likes.some((like) => like.id == session?.user.id);
  }
  
  const savePost = async (newLikes) => {
    return await updatePost(post.id, {
      ...post,
      likes: newLikes,
    });
  };
 
  const saveComment = async (newLikes) => {
    return await updatePost(post.id, {
      ...post,
      comments: [
        ...post.comments.map((com) => {
          if (com.id === comment.id) {
            return { ...com, likes: newLikes };
          }
          return com;
        }),
      ],
    });
  }
  
  const handleLike = async() =>  {
    if (!isLiked()) {   
      const newLikes = [...likes, session.user];
      comment ? await saveComment(newLikes) : await savePost(newLikes);
      setLikes(newLikes);
    } else {
      const newLikes = likes.filter((like) => like.id != session.user.id);
      comment ? await saveComment(newLikes) : await savePost(newLikes);
      setLikes(newLikes);
    }
  }
  
  const addComment = async (comment) => {
    const newComments = [
      ...comments,
      {
        id: uuid(),
        userUp: session.user,
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
