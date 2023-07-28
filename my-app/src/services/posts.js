import httpService from "./httpService";

export function getPosts(){
  
  return httpService.get('/posts');
}

export async function getPost(postId) {
 return httpService.get(`/posts/${postId}`);
}

export function savePost(post){
   return httpService.post('/posts',post);
}

export function updatePost(postId, newPost){
   return httpService.put(`/posts/${postId}`,newPost);
}

export function deletePost(postId) {
 return httpService.delete(`/posts/${postId}`);
}


