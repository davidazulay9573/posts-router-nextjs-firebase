"use client";
import { signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidation, passwordRegex } from "@/utils/formikValidation";
import Link from "next/link";
import { toast} from "react-toastify";

function SignUp() {
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
         try {
            await signUp(values);
           toast.success("Signed up successfully");
         } catch (error) {
           toast.error(error.response.data);
         }
    },
  });
  return (
    <div className="container-md w-50 text-center">
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-Up"></Form>
      <p>
        You already have an account? <Link href="/sign-in">Sign-in</Link>
      </p>
    </div>
  );
}

export default SignUp;
