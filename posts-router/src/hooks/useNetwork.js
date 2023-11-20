import useUserAndSave from "./useUserAndSave";
import { useSession } from "next-auth/react";
import { sendNotification } from "@/services/notifications";

function useNetwork(user) {
  const { data: session } = useSession();

  const [userCard, setUserCard] = useUserAndSave(user);
  const [userSession, setUserSession] = useUserAndSave(session?.user);

  const isFriend = () => {
    return (
      userSession?.friends?.includes(user.id) ||
      userCard?.friends?.includes(session?.user.id)
    );
  };
  const isFollow = () => {
    return userCard?.followers?.includes(session?.user.id);
  };
  const isSessionSentFriendRequest = () => {
    return userCard?.friendRequests?.includes(session?.user.id);
  };
  const isUserSentFriendRequest = () => {
    return userSession?.friendRequests?.includes(user.id);
  };

  const sendFriendRequest = async () => {
    const newFriendRequests = isSessionSentFriendRequest()
      ? userCard?.friendRequests?.filter(
          (userId) => userId !== session?.user.id
        )
      : [...userCard?.friendRequests, session?.user.id];

    await setUserCard({
      ...userCard,
      friendRequests: newFriendRequests,
    });
    !isSessionSentFriendRequest() &&
      (await sendNotification({
        userSender: session?.user.id,
        userReceives: user.id,
        type: "friend",
      }));
  };

  const sendFollowing = async () => {
    const newFollowers = isFollow()
      ? userCard.followers.filter((userId) => userId !== session?.user.id)
      : [...userCard.followers, session?.user.id];
    const newFollowing = isFollow()
      ? userSession?.following.filter((userId) => userId !== user.id)
      : [...userSession?.following, user.id];
    
    await setUserCard({
      ...userCard,
      followers: newFollowers,
    });
    await setUserSession({
      ...userSession,
      following: newFollowing,
    });

    !isFollow() && await sendNotification({
      userSender: session?.user.id,
      userReceives: user.id,
      type: "follow",
    });
  };
  const approveFriendRequest = async () => {
    await setUserCard({
      ...userCard,
      friends: [...userCard.friends, session?.user.id],
      friendRequests: [
        ...userCard?.friendRequests.filter(
          (userId) => userId !== session?.user.id
        ),
      ],
    });

    await setUserSession({
      ...userSession,
      friends: [...userSession?.friends, user.id],
      friendRequests: [
        ...userSession?.friendRequests.filter((userId) => userId !== user.id),
      ],
    });
    
    await sendNotification({
       userSender: session?.user.id,
       userReceives: user.id,
       type: "approve",
     });
  };

  const rejectFriendRequest = async () => {
       await setUserSession({
         ...userSession,
         friendRequests: [
           ...userSession?.friendRequests.filter(
             (userId) => userId !== user.id
           ),
         ],
       });
    
  };

  const removeFriend = async () => {
    await setUserCard({
      ...userCard,
      friends: userCard.friends.filter((userId) => userId !== session?.user.id),
    });

    await setUserSession({
      ...userSession,
      friends: [...userSession.friends.filter((userId) => userId !== user.id)],
    });
  };

  return [
    isFollow,
    isFriend,
    isSessionSentFriendRequest,
    isUserSentFriendRequest,
    sendFollowing,
    sendFriendRequest,
    approveFriendRequest,
    rejectFriendRequest,
    removeFriend,
    userCard,
    userSession,
  ];
}

export default useNetwork;
