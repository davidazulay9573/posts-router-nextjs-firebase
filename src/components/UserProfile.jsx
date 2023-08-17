'use client'
import { useState } from "react"
import {
  PlusIcon,
  UserAddIcon,
  UserRemoveIcon,
  MinusIcon,
  ArrowCircleRightIcon,
  CheckCircleIcon,
  XIcon
} from "@heroicons/react/solid";

import UserSimpleCard from "./UserSimpleCard";
import useNetwork from "@/hooks/useNetwork";

const UserProfile = ({ user}) => {

 const [
   isFollow,
   isFriend,
   isSessionSentFriendRequest,
   isUserSentFriendRequest,
   sendFollowing,
   sendFriendRequest,
   approveFriendRequest,
   removeFriend,
   friends,
   followers,
 ] = useNetwork(user);
 
 const [friendsView , setFriendsView] = useState(false);
 const [followersView, setFollowersView] = useState(false);
 
  return (
    <div className="border rounded-lg overflow-hidden p-4">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={user.image}
        alt={user.name}
      />

      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="mt-2 text-gray-600">{user?.bio}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={sendFollowing}
          className="flex items-center px-3 py-2 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow mx-2"
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
        {isUserSentFriendRequest() && !isFriend() ? (
          <>
            <button
              onClick={approveFriendRequest}
              className="flex items-center m-1 px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600 rounded shadow"
            >
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Approve
            </button>
            <button className="flex items-center m-1 px-2 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded shadow">
              <XIcon className="h-4 w-4 mr-1" />
              Reject
            </button>
          </>
        ) : isFriend() ? (
          <button
            onClick={removeFriend}
            className="flex items-center px-2 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded shadow"
          >
            <UserRemoveIcon className="h-4 w-4 mr-1" />
            Remove friend
          </button>
        ) : (
          <button
            onClick={sendFriendRequest}
            className="flex items-center  px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded shadow mx-2"
          >
            {isSessionSentFriendRequest() ?  (
              <>
                <ArrowCircleRightIcon className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <UserAddIcon className="h-5 w-5 mr-2" />
                Friend Request
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col mt-6">
        <button
          onClick={() => {
            setFriendsView((friendsView) => !friendsView);
          }}
          className="m-2"
        >
          {friends.length} Friends
        </button>
        {friendsView &&
          friends.map((userId) => (
            <UserSimpleCard key={userId} user={userId} />
          ))}
        <button
          onClick={() => {
            setFollowersView((followersView) => !followersView);
          }}
          className="m-2"
        >
          {followers.length} Followers
        </button>
        {followersView &&
          followers?.map((userId) => (
            <UserSimpleCard key={userId} user={userId} />
          ))}
        {/* <button className="m-2">{user?.posts.length} Posts</button> */}
      </div>
    </div>
  );
};

export default UserProfile;
