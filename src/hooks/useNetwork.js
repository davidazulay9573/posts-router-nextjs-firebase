import { updateUser } from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/users";

function useNetwork(user) {
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState(null);

  const [friends, setFriends] = useState(user.friends);
  const [followers, setFollowers] = useState(user.followers);
  const [friendRequests, setFriendRequests] = useState(user.friendRequests);

  useEffect(() => {
    (async () => {
      setUserSession((await getUser(session?.user.id)).data);
    })();
  }, [session]);

  const isFriend = () => {
    return friends.includes(session?.user.id);
  };
  const isFollow = () => {
    return followers.includes(session?.user.id);
  };
  const isSessionSentFriendRequest = () => {
    return friendRequests.includes(session?.user.id);
  };
  const isUserSentFriendRequest = () => {
    return userSession?.friendRequests?.includes(user.id);
  };

  const sendFriendRequest = async () => {
    const newFriendRequests = isSessionSentFriendRequest()
      ? [...friendRequests.filter((user) => user.id === session?.user.id)]
      : [...friendRequests, session?.user.id];
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
      ? [...followers.filter((user) => user.id === session?.user.id)]
      : [...followers, session?.user.id];
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
        friends: [...friends, userSession.id],
      });
      await updateUser(userSession.id, {
        ...userSession,
        friends: [...friends, user.id],
        friendRequests: [
          ...userSession.friendRequests.filter((req) => req.id === user.id),
        ],
      });
      setUserSession({
        ...userSession,
        friendRequests: [
          ...userSession.friendRequests.filter((req) => req.id === user.id),
        ],
      });
      setFriends([...friends, userSession.id]);
      console.log(friends);
      console.log(userSession);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {};

  const removeFriend = async () => {
    try {
      await updateUser(user.id, {
        ...user,
        friends: [...friends.filter((friend) => friend.id === userSession.id)],
      });
      await updateUser(userSession.id, {
        ...userSession,
        friends: [
          ...userSession.friends.filter((friend) => friend.id === user.id),
        ],
      });

      setFriends(friends.filter((friend) => friend.id === userSession.id));
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
  ];
}

export default useNetwork;
