import { getUser } from "@/services/users";
import PostCard from "@/components/PostCard";
import UserProfile from "@/components/UserProfile";

export default async function User({ params }) {

  const { userId } = params;
  const { user, posts } = (await getUser(userId)).data;  

  return (
    <div className="flex flex-col items-center m-4">
      
        <UserProfile user={user} />
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}