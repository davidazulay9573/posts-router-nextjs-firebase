import { getUser } from "@/services/users";
import PostCard from "@/components/PostCard";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function User({ params }) {
const session = getServerSession(authOptions);
  const { userId } = params;
  const { user, posts } = (await getUser(userId)).data;  
  if(!session) return<> Loading</>
  return (
    <div className="flex flex-col items-center m-4">
      
        <UserProfile user={user} />
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}