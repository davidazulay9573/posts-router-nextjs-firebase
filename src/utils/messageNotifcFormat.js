
export default function messageNotificFormat(type){
    return (
      (type === "like" && "Added a like to your post") ||
      (type === "comment" && "Added a comment to your post") ||
      (type === "friend" && "Sent you friend request") ||
      (type === "follow" && "Started following you") ||
      (type === "approve" && "Approved your friend request")
    );
}

