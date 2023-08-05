"use client";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { useEffect } from "react";
import { updateUser } from "@/services/users";
import Link from "next/link";
function FormEditProfile({user}) {
  useEffect(() => {
    if (!user) return;
    const { name = "", bio = "", image = "" } = user;
        
    formik.setValues({
      name,
      bio,
      image,
    });
  }, [user]);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      bio: "",
      image: "",
    },

    validate(values) {
      return formikValidation(values)(
        Joi.object({
          name: Joi.string().min(2).max(1024).required().label("Name"),
          bio: Joi.string().min(2).max(1024).allow("").label("Bio"),
          image: Joi.string().min(11).max(1024).allow("").label("Imag url"),
        })
      );
    },

    onSubmit: async ({name, bio, image}) => {
      await updateUser(user.id, { ...user, name, bio, image });
      window.location.href = "/personal";
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow rounded px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-col items-stretch"
    >
      <div className="mb-4 sm:mb-0 flex-grow mr-0 sm:mr-4">
        <label htmlFor="name"> Name </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
          id="inline-full-name"
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />
        <label htmlFor="bio"> Bio </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
          id="inline-full-name"
          type="text"
          placeholder="Bio"
          {...formik.getFieldProps("bio")}
        />
        <label htmlFor="image"> Imag-url</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
          id="inline-full-name"
          type="text"
          placeholder="Image url"
          {...formik.getFieldProps("image")}
        />
      </div>
      <div className="flex">
        <button
          disabled={!formik.isValid}
          className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 m-2"
          type="submit"
        >
          Save
        </button>
        <Link href="/personal">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12 m-2">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default FormEditProfile;
