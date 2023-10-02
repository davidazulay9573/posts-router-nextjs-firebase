"use client";
import { useEffect } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { updatePost,deletePost } from "@/services/posts";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/solid";
import Link from "next/link";

function FormEditPost({post}) {
  const { data: session } = useSession();
   useEffect(() => {
     if (!post) return;
     const { body="" } = post;
     formik.setValues({
       ...formik.values,
        body
     });
   }, [post]);

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
      await updatePost(post.id,{ ...post, body, userUp: session?.user.id });
      window.location.href = `/posts/${post.id}`;
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow rounded px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-col items-stretch"
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
        <div className="flex">
          <button
            disabled={!formik.isValid}
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 m-2"
            type="submit"
          >
            Edit 
          </button>
          <Link href="/personal">
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 m-2">
              Cancel
            </button>
          </Link>
        </div>
      </form>
      <br /> <br />
      <button
        onClick={async () => {
          await deletePost(post.id);
          window.location.href = `/personal`;
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center mt-4 transition duration-150 ease-in-out shadow-md"
      >
        <TrashIcon className="w-6 h-6 mr-2" aria-hidden="true" />
        Delete Post
      </button>
    </div>
  );
}

export default FormEditPost;
