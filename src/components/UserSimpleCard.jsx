'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSpicificUser from "@/hooks/useSpecificUser";
export default function UserSimpleCard({ user }){
  const { data: session } = useSession();
  const userCard = useSpicificUser(user);

    return (
      <div className="flex items-center justify-between space-x-4 p-2 rounded shadow-md m-2">
        <Link
          href={session?.user.id == userCard?.id ? "/personal" : `/users/${userCard?.id}`}
        >
          <div className="flex sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userCard?.image}
              alt={userCard?.name}
            />
            <div className="font-semibold text-sm text-center sm:text-left m-2">
              {userCard?.name}
            </div>
          </div>
        </Link>
        <div className="flex space-x-2"> </div>
      </div>
    );
}