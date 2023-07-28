'use client'
import { PlusIcon, UserAddIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { updateUser } from "@/services/users";
import { useSession } from "next-auth/react";

export function UserCard({ user }){
  const {data: session } = useSession();
  
  const sendFriendRequest = async  () => {
    const friendRequests = user.friendRequests;
    friendRequests.push(session?.user);
    try {
       await updateUser(user.id, {
         ...user,
         friendRequests,
       });
    } catch (error) {
      console.error(error);
      
    }
  }

  const sendFollowing =  async () => {
    const followers = user.followers;
    followers.push(session?.user);
    try {
       await updateUser(user.id, {
         ...user,
         followers,
       });
    } catch (error) {
      console.error(error);
    }
    
  }
 
  return (
    <div className="flex items-center justify-between space-x-4 p-2 rounded shadow-md m-2">
      <Link href={`/users/${user.id}`}>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.image}
            alt={user.name}
          />
          <div className="font-semibold text-sm text-center sm:text-left">
            {user.name}
          </div>
        </div>
      </Link>
      <div className="flex space-x-2">
        <button onClick={sendFollowing} className="flex items-center px-2 py-1 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow">
          <PlusIcon className="h-4 w-4 mr-1" />
          Follow
        </button>
        <button onClick={sendFriendRequest} className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow">
          <UserAddIcon className="h-4 w-4 mr-1" />
          Friend Request
        </button>
      </div>
    </div>
  );
}