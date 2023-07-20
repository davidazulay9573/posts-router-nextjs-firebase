
export async function getPosts(){
    const response = await fetch("http://localhost:3000/api/posts" ,{
      method:'GET',
      headers:{'content-type':'application/json'}
    });
    const posts = await response.json();
    
    return posts;
}

export async function getPost(postId) {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const post = await response.json();

  return post;
}

export async function savePost(post){
    try {
        const response = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost(postId) {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });

  window.location.href = " posts"
  return response
}


