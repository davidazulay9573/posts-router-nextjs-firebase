"use client";

import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { savePost } from "@/services/posts";
import { useSession } from "next-auth/react";

function FormAddPost() {
  const {data:session} = useSession();

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
      
      await savePost({ body, userUp: session?.user.id });
      window.location.href = "/posts";
    },
  });
  
  return (
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
        Add Post
      </button>
    </form>
  );
}

export default FormAddPost;
