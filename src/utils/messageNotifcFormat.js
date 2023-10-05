
export default function messageNotificFormat(type){
    return (
      (type === "likePost" && "Added a like to your post") ||
      (type === "likeComment" && "Added a like to your comment") ||
      (type === "comment" && "Added a comment to your post") ||
      (type === "friend" && "Sent you friend request") ||
      (type === "follow" && "Started following you") ||
      (type === "approve" && "Approved your friend request")
    );
}

