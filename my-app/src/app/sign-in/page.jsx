"use client";

import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidation, passwordRegex } from "@/utils/formikValidation";
import Link from "next/link";

function SignIn() {
  const router = useRouter();

  const inputs = [
    { name: "email", lable: "Email", type: "email" },
    { name: "password", lable: "Password", type: "password" },
  ];

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          email: Joi.string()
            .min(2)
            .max(250)
            .email({ tlds: { allow: false } })
            .required()
            .label("Email"),
          password: Joi.string()
            .min(6)
            .max(250)
            .required()
            .regex(passwordRegex)
            .label("Password")
            .messages({
              "string.pattern.base": `The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).`,
            }),
        })
      );
    },
    onSubmit: async (values) => {
      const { result, error } = await signIn(values.email, values.password);

      if (error) {
        return console.log(error);
      }

      // else successful
      console.log(result);
      return router.push("/");
    },
  });
  return (
    <div className="container-md w-50 text-center">
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-In"></Form>
      <button className="flex m-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        <img
          loading="lazy"
          className="m-1"
          height="24"
          width="24"
          src="https://authjs.dev/img/providers/google.svg"
        />
        <span className="m-1">Sign in with Google</span>
      </button>
      <p>
        Don't have an account yet? <Link href="/sign-up">Sign-up</Link>
      </p>
    </div>
  );
}

export default SignIn;