import { useState,  useEffect } from "react";
import { useSession } from "next-auth/react";
import { updatePost } from "@/services/posts";
import { sendNotification } from "@/services/notifications";
import { getPost } from "@/services/posts";
import { v4 as uuid } from "uuid";

function usePost(post) {
  const { data: session } = useSession();
  
  const [likes, setLikes] = useState(post?.likes);
  const [comments, setComments] = useState(post?.comments);

   useEffect(() => {
    (async () => {
      const data = (await getPost(post.id)).data;
      setLikes(data.post.likes)
      setComments(data.post.comments)
    })()
   },[session])
  
  const isPostLiked = () => {
    return likes.includes(session?.user.id);
  };

  const isCommentLiked = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    return comment?.likes.includes(session?.user.id);
  };

  const handleLikePost = async () => {
    try {
      const newLikes = isPostLiked()
        ? likes.filter((like) => like != session?.user.id)
        : [...likes, session?.user.id];

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
        ? comment.likes.filter((like) => like != session.user.id)
        : [...comment.likes, session?.user.id];

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
        userUp: session?.user.id,
        createdAt:Date.now(),
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
              userUp: session?.user.id,
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
