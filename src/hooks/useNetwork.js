import { updateUser } from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/users";

function useNetwork(user) {
  const { data: session } = useSession();
 
  const [friends, setFriends] = useState(user.friends);
  const [followers, setFollowers] = useState(user.followers);
  const [friendRequests, setFriendRequests] = useState(user.friendRequests);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    (async () => {
      const userSession = (await getUser(session?.user.id)).data.user;
      const userCard = (await getUser(user.id)).data.user;
      setUserSession(userSession);
      setFriends(userCard.friends);
      setFollowers(userCard.followers);
      setFriendRequests(userCard.friendRequests);
    })();
  }, [session, user]);

  const isFriend = () => {
    return (
      userSession?.friends?.includes(user.id) ||
      friends.includes(session?.user.id)
    );
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
      ? friendRequests.filter((userId) => userId !== session?.user.id)
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
      ? followers.filter((userId) => userId !== session?.user.id)
      : [...followers, session?.user.id];
    const newFollowing = isFollow()
      ? userSession?.following.filter((userId) => userId !== user.id)
      : [...userSession?.following, user.id];
    try {
      await updateUser(user.id, {
        ...user,
        followers: newFollowers,
      });
      await updateUser(session?.user.id, {
        ...userSession,
        following: newFollowing,
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
        friends: [...friends, session?.user.id],
      });
      await updateUser(session?.user.id, {

        ...userSession,
        friends: [...userSession?.friends, user.id],
        friendRequests: [
          ...userSession.friendRequests.filter((userId) => userId !== user.id),
        ],
      });
      setUserSession({
        ...userSession,
        friends: [...userSession?.friends, user.id],
        friendRequests: [
          ...userSession?.friendRequests.filter((userId) => userId !== user.id),
        ],
      });
      setFriends([...friends, session?.user.id]);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {};

  const removeFriend = async () => {
    try {
      await updateUser(user.id, {
        ...user,
        friends: [...friends.filter((userId) => userId !== session?.user.id)],
      });
      await updateUser(session?.user.id, {
        ...userSession,
        friends: [
          ...userSession.friends.filter((userId) => userId !== user.id),
        ],
      });

      setFriends(friends.filter((userId) => userId !== session?.user.id));
      setUserSession({
        ...userSession,
        friends: [
          ...userSession.friends.filter((userId) => userId !== user.id),
        ],
      });
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
    friends,
    followers,
  ];
}

export default useNetwork;
