"use client";
import Form from "@/components/Form";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";
import { savePost } from "@/services/posts";

function AddCard() {
  const inputs = [
    { name: "title", lable: "Title", type: "text" },
    { name: "body", lable: "Body", type: "text" },
    { name: "image", lable: "Image", type: "text" },
  ];

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      body: "",
      image: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          title: Joi.string().min(2).max(255).required().label("Title"),
          body: Joi.string().min(2).max(1024).required().label("Body"),

          image: Joi.string().min(11).max(1024).allow("").label("Image"),
        })
      );
    },
    onSubmit: async (values) => {
      await savePost(values);
      window.location.href = "/posts";
    },
  });

  return (
    <div className="flex items-center">
      <div className="p-24"></div>
      <Form inputs={inputs} formik={formik} buttonTitle="Add-Card"></Form>
      <div className="p-24"> </div>
    </div>
  );
}

export default AddCard;
