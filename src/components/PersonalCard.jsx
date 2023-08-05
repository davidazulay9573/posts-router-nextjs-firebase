"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import UserSimpleCard from "./UserSimpleCard";
import { PencilIcon } from "@heroicons/react/solid";
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
    <div className="border rounded-lg overflow-hidden p-4">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={user.image}
        alt={user.name}
      />
      <PencilIcon className="h-5 w-5 mr-2" />
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="mt-1 text-gray-500">{user.email}</p>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800"></h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow rounded px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-stretch"
          >
            <div className="mb-4 sm:mb-0 flex-grow mr-0 sm:mr-4">
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="inline-full-name"
                type="text"
                placeholder="Your Post..."
                {...formik.getFieldProps("body")}
              />
            </div>

            <button
              disabled={!formik.isValid}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12"
              type="submit"
            >
              Set Bio
            </button>
          </form>
          <p className="mt-2 text-gray-600">{user?.bio}</p>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <button
          onClick={() => {
            setFriendsView((friendsView) => !friendsView);
          }}
          className="m-2"
        >
          {user?.friends.length} Friends
        </button>
        {friendsView &&
          user.friends.map((user) => (
            <UserSimpleCard key={user.id} user={user} />
          ))}
        <button
          onClick={() => {
            setFollowersView((friendsView) => !friendsView);
          }}
          className="m-2"
        >
          {user.followers.length} Followers
        </button>
        {followersView &&
          user.followers.map((user) => (
            <UserSimpleCard key={user.id} user={user} />
          ))}
        <button className="m-2">{user?.posts.length} Posts</button>
      </div>
    </div>
  );
};

export default PersonalCard;
