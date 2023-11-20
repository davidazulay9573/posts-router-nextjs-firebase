"use client";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { useEffect,useState } from "react";
import { updateUser } from "@/services/users";
import Link from "next/link";
import uploadFile from "@/fireBase/uploadFile";
import GenerateImageAi from "./GenerateImageAi";
import { saveImage } from "@/services/ai";

function FormEditProfile({user}) {
 const [profilePicture, setProfilePicture] = useState(user.image);
 const [generateImagFrom, setGenerateImagFrom ] = useState(false);

 const handleFileInputChenge = async (e) => {
    setGenerateImagFrom((generateImagFrom) => !generateImagFrom);
    formik.setFieldValue("image", e.currentTarget.files[0]);
    setProfilePicture('pending');
    const image_url = await uploadFile(e.currentTarget.files[0],user.id);
    setProfilePicture(image_url && image_url);
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
          image: Joi.allow("").label("Image"),
         
        })
      );
    },

    onSubmit: async ({ name, bio }) => {
      const newUrl = (await saveImage(profilePicture , user.id)).data
      await updateUser(user.id, { ...user, name, bio, image: newUrl});
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
              profilePicture === "pending" ? (
                <div className="flex justify-center mt-4 w-32 h-32 rounded-full object-cover border-2 border-gray-300">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <img
                  src={profilePicture}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                  alt="Preview"
                />
              )
            ) : (
              <div className="w-32 h-32 rounded-full border bg-gray-200 flex justify-center items-center">
                <span className="text-gray-400">Choose image</span>
              </div>
            )}
          </label>

          <input
            className="hidden "
            id="image"
            name="image"
            type="file"
            onChange={handleFileInputChenge}
          />
        </div>
      </span>

      {generateImagFrom && (
        <GenerateImageAi
          url={profilePicture}
          setImageState={setProfilePicture}
          imagePath={user.id}
        />
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center mt-4 transition duration-150 ease-in-out shadow-md"
        type="button"
        onClick={() => {
          setGenerateImagFrom((generateImagFrom) => !generateImagFrom);
          generateImagFrom &&  setProfilePicture(user.image);
        }}
      >
        {!generateImagFrom ? "Use Ai" : "Cancel"}
      </button>
      <br />
      <div className="mb-4 sm:mb-0 flex-grow mr-0 sm:mr-4 text-center">
        <label htmlFor="name"> Name </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
          id="name"
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />

        <label htmlFor="bio"> Bio </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
          id="bio"
          type="text"
          placeholder="Bio"
          {...formik.getFieldProps("bio")}
        />
      </div>
      <div className="flex">
        <button
          disabled={
            (!formik.isValid &&
              ["pending", user.image].includes(profilePicture)) ||
            profilePicture === "pending"
          }
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
