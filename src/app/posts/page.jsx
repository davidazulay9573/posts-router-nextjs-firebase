import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FormAddPost from "@/components/FormAddPost";
import { getUser } from "@/services/users";

export default async function Feed() {
  const session = await getServerSession(authOptions);
  const { user: userSession } = (await getUser(session?.user.id)).data;
  const posts = ((await getPosts()).data).filter((post) => {
     return userSession.friends.includes(post.userUp) ||
      userSession.following.includes(post.userUp) ||
      userSession.id === post.userUp;
  });
  console.log(posts);
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <FormAddPost  session={session} />
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}

    
    </div>  
  );
}
