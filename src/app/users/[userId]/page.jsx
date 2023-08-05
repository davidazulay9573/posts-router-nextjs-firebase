import { getUser } from "@/services/users";
import PostCard from "@/components/PostCard";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PersonalCard from "@/components/PersonalCard";
export default async function User({ params }) {
  const session = await getServerSession(authOptions);
  const { userId } = params;
  const user = (await getUser(userId)).data;
  console.log(session?.user.id , userId);
  
  <div className=""></div>
  return (
    <div className="flex flex-col items-center m-4">
      {session?.user.id == userId ? (
        <PersonalCard user={user} />
      ) : (
        <UserProfile user={user} />
      )}

      {user.posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}