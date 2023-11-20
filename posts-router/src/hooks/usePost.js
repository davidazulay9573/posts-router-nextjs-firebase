
import { useSession } from "next-auth/react";
import { sendNotification } from "@/services/notifications";
import { v4 as uuid } from "uuid";
import usePostAndSave from "./usePostAndSave";

function usePost(postPR) {
  const [post , setPost] = usePostAndSave(postPR);
  const { data: session } = useSession();

  const isPostLiked = () => {
    return post.likes.includes(session?.user.id);
  };

  const isCommentLiked = (commentId) => {
    const comment = post.comments.find((c) => c.id === commentId);
    return comment?.likes.includes(session?.user.id);
  };

  const handleLikePost = async () => {
    try {
      const newLikes = isPostLiked()
        ? post.likes.filter((like) => like != session?.user.id)
        : [...post.likes, session?.user.id];

      await setPost( {
        ...post,
        likes: newLikes,
      });
       !isPostLiked() &&
         session?.user.id != post.userUp && 
         (
             await sendNotification({
               userSender: session?.user.id,
               userReceives: post.userUp,
               type: "likePost",
               link:`/posts/${post.id}`
             })
           );
      
    } catch (error) {
      console.error(error);
    }

  };
  const handleLikeComment = async (commentId) => {
    try {
      const comment = post.comments.find((c) => c.id === commentId);

      const newLikes = isCommentLiked(commentId)
        ? comment.likes.filter((like) => like != session.user.id)
        : [...comment.likes, session?.user.id];

      const newComments = post.comments.map((com) => {
        if (com.id === comment.id) {
          return { ...com, likes: newLikes };
        }
        return com;
      });

      await setPost( {
        ...post,
        comments: newComments,
      });
       !isCommentLiked() &&
         session?.user.id != post.userUp &&
         (await sendNotification({
           userSender: session?.user.id,
           userReceives: post.userUp,
           type: "likeComment",
           link: `/posts/${post.id}`,
         }));
      
    } catch (error) {
      console.error(error);
    }
  };
  
  const addCommentToPost = async (comment) => {
    const newComments = [
      ...post.comments,
      {
        id: uuid(),
        userUp: session?.user.id,
        createdAt:Date.now(),
        content: comment,
        likes: [],
        comments: [],
      },
    ];
    await setPost( {
      ...post,
      comments: newComments,
    });
   
  };

  // const addCommentToComment = async (commentId, newComment) => {
  //   const comment = comments.find((c) => c.id === commentId);
  //   const newComments = comments.map((com) => {
  //     if (com.id === comment.id) {
  //       return {
  //         ...com,
  //         comments: [
  //           ...comment.comments,
  //           {
  //             id: uuid(),
  //             userUp: session?.user.id,
  //             createdAt: new Date().getTime(),
  //             content: newComment,
  //             likes: [],
  //             comments: [],
  //           },
  //         ],
  //       };
  //     }
  //     return com;
  //   });
   
  //   await updatePost(post.id, {
  //     ...post,
  //     comments: newComments,
  //   });
  //   setComments(newComments);
  // };

  return [
    post,
    isPostLiked,
    handleLikePost,
    isCommentLiked,
    handleLikeComment,
    addCommentToPost,
  ];
}
export default usePost;
