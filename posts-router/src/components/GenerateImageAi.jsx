'use client'
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { generateImag, saveImage } from "@/services/ai";


export default function GenerateImageAi({ setImageState}) {

   const formik = useFormik({
     validateOnMount: true,
     initialValues: {
       prompt:"",
     },

     validate(values) {
       return formikValidation(values)(
         Joi.object({
           prompt: Joi.string().min(2).max(1024).label("Image Prompt"),
         })
       );
     },

     onSubmit: async ({ prompt }) => {
      setImageState("pending");
       const image_url = (
         await generateImag(prompt)
       ).data;
       setImageState(image_url && image_url);
     },
   });

  return (
    <div
      className="bg-white shadow rounded px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-stretch"
    >
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 m-2"
        id="prompt"
        type="text"
        placeholder="Describe your picture"
        {...formik.getFieldProps("prompt")}
      />
      <button
        type="button"
        onClick={formik.handleSubmit}
        className="bg-gray-500 hover:bg-gray-400 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline h-12 m-2"
      >
        Generate Image 
      </button>
    </div>
  );
}
