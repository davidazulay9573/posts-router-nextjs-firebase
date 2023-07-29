import { getUser } from "@/services/users";
import PostCard from "@/components/PostCard";
import UserProfile from "@/components/UserProfile";

export default async function User({ params }) {
  const { userId } = params;
  const user = (await getUser(userId)).data;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 m-4">
      <UserProfile user={user} />
      {user.posts.map(post => {return <PostCard key={post.id} post={post}/>})}

    </div>
  );
}