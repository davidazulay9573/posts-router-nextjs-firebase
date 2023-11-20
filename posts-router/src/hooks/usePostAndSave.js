import { useState, useEffect } from "react";
import { getPost,updatePost } from "@/services/posts";

function usePostAndSave(postAT) {
  const [post, setPost] = useState(postAT);
  useEffect(() => {
    (async () => {
      const post = (await getPost(postAT?.id)).data;
      setPost(post);
    })();
  }, [postAT]);

  const setPostAndSave = async (newPost) => {
    await updatePost(postAT?.id, newPost);
    setPost(newPost);
  };

  return [post, setPostAndSave];
}

export default usePostAndSave;
