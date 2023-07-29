"use client";
import {
  PlusIcon,
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
    isFriend,
    isSessionSentFriendRequest,
    isUserSentFriendRequest,
    sendFollowing,
    sendFriendRequest,
    approveFriendRequest,
    removeFriend,
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
        <div className="flex flex-col items-center px-2 py-1 text-xs rounded shadow">
          {isUserSentFriendRequest() && (
            <>
              <p className="m-1"> Friend request</p>
              <button
                onClick={approveFriendRequest}
                className="flex items-center m-1 px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
              >
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Approve
              </button>
              <button
                onClick={sendFriendRequest}
                className="flex items-center m-1 px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
              >
                <XIcon className="h-4 w-4 mr-1" />
                Reject
              </button>
            </>
          )}
          {isFriend() && (
            <button
              onClick={removeFriend}
              className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
            >
              <UserRemoveIcon className="h-4 w-4 mr-1" />
              Remove friend
            </button>
          )}
          {!isFriend() && !isSessionSentFriendRequest() && !isUserSentFriendRequest() && (
            <button
              onClick={sendFriendRequest}
              className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
            >
              <UserAddIcon className="h-4 w-4 mr-1" />
              Send friends
            </button>
          )}

          {isSessionSentFriendRequest() && !isFriend() && (
            <button
              onClick={sendFriendRequest}
              className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
            >
              <ArrowCircleRightIcon className="h-4 w-4 mr-1" />
              Cancel
            </button>
          )}
          {isFollow() ? (
            <button
              onClick={sendFollowing}
              className="flex items-center m-1 px-2 py-1 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow"
            >
              <UserRemoveIcon className="h-4 w-4 mr-1" />
              Un Follow
            </button>
          ) : (
            <button
              onClick={sendFollowing}
              className="flex items-center m-1 px-2 py-1 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
