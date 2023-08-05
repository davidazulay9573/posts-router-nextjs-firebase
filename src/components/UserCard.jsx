"use client";
import {
  PlusIcon,
  MinusIcon,
  UserAddIcon,
  UserRemoveIcon,
  CheckCircleIcon,
  ArrowCircleRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import useNetwork from "@/hooks/useNetwork";

export function UserCard({ user }) {
  const  [
    isFollow,
    sendFollowing,
    followers
  ] = useNetwork(user);
  
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
        <div className="flex flex-col  ">
        
            <button
              onClick={sendFollowing}
              className="flex items-center px-2 py-1 m-1 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow"
            >
              {isFollow() ? (
                <>
                  <MinusIcon className="h-5 w-5 mr-2" /> Un-Follow
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" /> Follow
                </>
              )}
            </button>
          
        </div>
      </div>
    </div>
  );
}
