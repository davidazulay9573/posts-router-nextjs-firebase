
import { updateUser } from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/users";
import useSpicificUser from "./useSpecificUser";

function useNetwork(user) {
  const { data: session } = useSession();

  const [friends, setFriends] = useState(user.friends);
  const [followers, setFollowers] = useState(user.followers);
  const [friendRequests, setFriendRequests] = useState(user.friendRequests);
  
  const userSession = useSpicificUser(session?.user.id);

  const isFriend = () => {
    return friends.some((friend) => friend.id === userSession?.id);
  };
  const isFollow = () => {
    return followers.some((follower) => follower.id === userSession?.id);
  };
  const isSessionSentFriendRequest = () => {
    return friendRequests.some((reqFr) => reqFr.id === userSession?.id);
  };
  const isUserSentFriendRequest = () => {
    return userSession?.friendRequests?.some((reqFr) => reqFr.id === user.id);
  };



  const sendFriendRequest = async () => {
    const newFriendRequests = isSessionSentFriendRequest()
      ? friendRequests.filter((el) => el.id !== userSession?.id)
      : [
          ...friendRequests,
          {
            name: userSession.name,
            image: userSession.image,
            id: userSession.id,
          },
        ];
    try {
      await updateUser(user.id, {
        ...user,
        friendRequests: newFriendRequests,
      });
      setFriendRequests(newFriendRequests);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFollowing = async () => {
    const newFollowers = isFollow()
      ? [...followers.filter((user) => user.id !== userSession?.id)]
      : [...followers, { name:userSession.name, image:userSession.image, id:userSession.id }];
    try {
      await updateUser(user.id, {
        ...user,
        followers: newFollowers,
      });
      setFollowers(newFollowers);
    } catch (error) {
      console.error(error);
    }
  };
  const approveFriendRequest = async () => {
    try {
      await updateUser(user.id, {
        ...user,
        friends: [...friends, { name:userSession.name, image:userSession.image, id:userSession.id } ],
      });
      await updateUser(userSession.id, {
        ...userSession,
        friends: [...friends, { name:user.name, image:user.image, id:user.id }],
        friendRequests: [
          ...userSession.friendRequests.filter((req) => req.id !== user.id),
        ],
      });
      setUserSession({
        ...userSession,
        friendRequests: [
          ...userSession.friendRequests.filter((req) => req.id !== user.id),
        ],
      });
      setFriends([
        ...friends,
        {
          name: userSession.name,
          image: userSession.image,
          id: userSession.id,
        },
      ]);
    
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {};

  const removeFriend = async () => {
    try {
      await updateUser(user.id, {
        ...user,
        friends: [...friends.filter((friend) => friend.id !== userSession.id)],
      });
      await updateUser(userSession.id, {
        ...userSession,
        friends: [
          ...userSession.friends.filter((friend) => friend.id !== user.id),
        ],
      });

      setFriends(friends.filter((friend) => friend.id !== userSession.id));
    } catch (error) {}
  };
  return [
    isFollow,
    isFriend,
    isSessionSentFriendRequest,
    isUserSentFriendRequest,
    sendFollowing,
    sendFriendRequest,
    approveFriendRequest,
    removeFriend,
    followers,
  ];
}

export default useNetwork;