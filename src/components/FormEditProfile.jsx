"use client";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { useEffect,useState } from "react";
import { updateUser } from "@/services/users";
import Link from "next/link";
import uploadFile from "@/fireBase/uploadFile";
function FormEditProfile({user}) {
 const [profilePicture, setProfilePicture] = useState(user.image);

 const handleFileInputChenge = async (e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
    setProfilePicture(await uploadFile(e.currentTarget.files[0]));
 }

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
      image: null,
    },

    validate(values) {
      return formikValidation(values)(
        Joi.object({
          name: Joi.string().min(2).max(1024).required().label("Name"),
          bio: Joi.string().min(2).max(1024).allow("").label("Bio"),
          image: Joi.allow("").label("Imag url"),
        })
      );
    },

    onSubmit: async ({ name, bio }) => {
      await updateUser(user.id, { ...user, name, bio, image: profilePicture });
      window.location.href = "/personal";
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow rounded px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-col items-center"
    >
      <span className="w-32 h-32 rounded-full mx-auto">
        <div className="image-uploader">
          <label htmlFor="image" className="image-label">
            {profilePicture ? (
              <img
                src={profilePicture}
                className="w-32 h-32 rounded-full"
                alt="Preview"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border bg-gray-200 flex justify-center items-center">
                <span className="text-gray-400">Choose image</span>
              </div>
            )}
          </label>
          <input
            className="hidden"
            id="image"
            name="image"
            type="file"
            onChange={handleFileInputChenge}
          />
        </div>
      </span>

      <div className="mb-4 sm:mb-0 flex-grow mr-0 sm:mr-4 text-center">
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
