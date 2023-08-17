import { getPostsServer } from "@/services/posts.server";
import PostCard from "@/components/PostCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FormAddPost from "@/components/FormAddPost";
import { getUser } from "@/services/users";

export default async function Feed() {
  const session = await getServerSession(authOptions);
  const { user: userSession } = (await getUser(session?.user.id)).data;
  const posts = await getPostsServer()
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <FormAddPost userSession={userSession} />
        {posts.map((post) => {
           return <PostCard key={post.id} post={post} />;
        })}
    </div>
  );
}
