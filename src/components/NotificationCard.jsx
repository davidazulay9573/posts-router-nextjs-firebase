"use client";
import Link from "next/link";
import useSpicificUser from "@/hooks/useSpecificUser";
import dateFormat from "@/utils/dateFormat";

export default function NotificationCard({ notification }) {
  const user = useSpicificUser(notification.userSender);
  return (
    <div className="flex items-center justify-between space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mx-4 my-2">
      {notification.userSender && (
        <Link href={`/users/${notification.userSender}`}>
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            src={user?.image}
            alt={user?.name}
          />
          <div className="text-gray-800 font-medium text-sm">{user?.name}</div>
        </Link>
      )}

      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
        <Link href={notification.link || `/users/${notification.userSender}`}>
          <p>{notification.message}</p>
        </Link>

        <p className="text-xs sm:text-sm">
          {dateFormat(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}
