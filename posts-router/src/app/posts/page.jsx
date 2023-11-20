import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FormAddPost from "@/components/FormAddPost";

export default async function Feed() {
  const session = await getServerSession(authOptions);
  const posts = (await getPosts(null, session?.user.id)).data;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <FormAddPost session={session} />
      {
      posts.length
        ? posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })
        : "Add friends to see posts"
        }
    </div>
  );
}
