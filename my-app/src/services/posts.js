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

export function deletePost(postId) {
 return httpService.delete(`/posts/${postId}`);

}


