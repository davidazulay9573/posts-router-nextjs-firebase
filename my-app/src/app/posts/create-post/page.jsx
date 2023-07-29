"use client";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { savePost } from "@/services/posts";
import { useSession } from "next-auth/react";
import generatePostAI from "@/open-ai/generatePostAI";
function CreatePost() {
  const {data: session} = useSession();
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

    onSubmit: async ({body}) => {
      await savePost({body, userUp:session.user});
    
      window.location.href = '/posts'
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:w-1/3 lg:mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              placeholder="Your Post..."
              {...formik.getFieldProps("body")}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!formik.isValid}
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
