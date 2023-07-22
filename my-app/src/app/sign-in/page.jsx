"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
 
  return (
    <>
      <button className="flex m-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        <img
          loading="lazy"
          className="m-1"
          height="24"
          width="24"
          src="https://authjs.dev/img/providers/google.svg"
        />
        <span className="m-1">Sign in with Google</span>
      </button>
    </>
  );
}
