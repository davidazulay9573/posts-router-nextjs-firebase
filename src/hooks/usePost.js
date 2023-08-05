import { useState } from "react";
import { useSession } from "next-auth/react";
import { updatePost, deletePost } from "@/services/posts";
import { v4 as uuid } from "uuid";

function usePost(post) {
  const { data: session } = useSession();

  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const isPostLiked = () => {
    return likes.some((like) => like.id == session?.user.id);
  };

  const isCommentLiked = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    return comment?.likes.some((like) => like.id === session?.user.id);
  };

  const handleLikePost = async () => {
    try {
      const newLikes = isPostLiked()
        ? likes.filter((like) => like.id != session.user.id)
        : [...likes, session.user];

      await updatePost(post.id, {
        ...post,
        likes: newLikes,
      });

      setLikes(newLikes);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLikeComment = async (commentId) => {
    try {
      const comment = comments.find((c) => c.id === commentId);

      const newLikes = isCommentLiked(commentId)
        ? comment.likes.filter((like) => like.id != session.user.id)
        : [...comment.likes, session?.user];

      const newComments = comments.map((com) => {
        if (com.id === comment.id) {
          return { ...com, likes: newLikes };
        }
        return com;
      });
      await updatePost(post.id, {
        ...post,
        comments: newComments,
      });
      setComments(newComments);
    } catch (error) {
      console.error(error);
    }
  };
  const addCommentToPost = async (comment) => {
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
  };

  const addCommentToComment = async (commentId, newComment) => {
    const comment = comments.find((c) => c.id === commentId);
    const newComments = comments.map((com) => {
      if (com.id === comment.id) {
        return {
          ...com,
          comments: [
            ...comment.comments,
            {
              id: uuid(),
              userUp: session.user,
              createdAt: new Date().getTime(),
              content: newComment,
              likes: [],
              comments: [],
            },
          ],
        };
      }
      return com;
    });
   
    await updatePost(post.id, {
      ...post,
      comments: newComments,
    });
    setComments(newComments);
  };


 


  return [
    likes,
    comments,
    isPostLiked,
    handleLikePost,
    isCommentLiked,
    handleLikeComment,
    addCommentToPost,
  ];
}
export default usePost;
