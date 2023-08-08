"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import UserSimpleCard from "./UserSimpleCard";
import { PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";

const PersonalCard = ({ user }) => {
  const [friendsView, setFriendsView] = useState(false);
  const [followersView, setFollowersView] = useState(false);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      body: "",
    },

    validate(values) {
      return formikValidation(values)(
        Joi.object({
          body: Joi.string().min(2).max(1024).required().label("Body"),
        })
      );
    },

    onSubmit: async ({ body }) => {
      await savePost({ body, userUp: session.user });
      window.location.href = "/posts";
    },
  });

  return (
    <div className="bg-white shadow p-6 rounded-lg w-full md:max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 text-center">
          
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={user.image}
            alt={user.name}
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-lg font-semibold text-gray-500">{user?.bio}</p>
            <Link
              href="/personal/edit-profile"
              className="text-blue-600 hover:text-blue-900 cursor-pointer flex justify-center items-center mt-2"
            >
              <PencilIcon className="h-5 w-5 mr-2" /> Edit
            </Link>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:w-2/3 flex flex-col space-y-4">
          <button
            onClick={() => setFriendsView((friendsView) => !friendsView)}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Friends {user?.friends.length}
          </button>
          {friendsView &&
            user.friends.map((user) => (
              <UserSimpleCard key={user.id} user={user} />
            ))}
          <button
            onClick={() => setFollowersView((followersView) => !followersView)}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Followers {user.followers.length}
          </button>
          {followersView &&
            user.followers.map((user) => (
              <UserSimpleCard key={user.id} user={user} />
            ))}
          <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            {/* Posts {user?.posts.length} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCard;
