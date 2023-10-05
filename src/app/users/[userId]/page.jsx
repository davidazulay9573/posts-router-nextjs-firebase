import { getUser, getUsers } from "@/services/users";
import PostCard from "@/components/PostCard";
import UserProfile from "@/components/UserProfile";
import { redirect } from "next/navigation";
import { getPosts } from "@/services/posts";
export default async function User({ params }) {

  const { userId } = params; 
  const usersId = await (await getUsers()).data.map(user => {return user.id})

  if(!usersId.includes(userId)){
      redirect('/users')
  }
  const  user = (await getUser(userId)).data;  
  const posts = await (await getPosts(userId)).data
  return (
    <div className="flex flex-col items-center m-4">
      
        <UserProfile user={user} />
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}