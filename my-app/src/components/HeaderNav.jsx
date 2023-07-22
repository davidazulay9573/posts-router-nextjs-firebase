"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const LINKS = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Posts", path: "/posts" },
  { title: "Create-post", path: "/posts/create-post" },
];

function HeaderNav() {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-800 px-5 py-5">
      <div className="flex mx-auto max-w-5xl items-center">
        <ul className="flex gap-4">
          {LINKS.map((item) => (
            <li
              key={item.path}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        {session && (
          <>
            <p className="m-2 ml-auto flex gap-4 text-white">
              {session.user?.name}
            </p>
            <button
              onClick={signOut}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default HeaderNav;
