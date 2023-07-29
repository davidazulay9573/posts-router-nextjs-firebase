'use client'
import Comment from "./Comment";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "@/utils/formikValidation";

function Comments({post, comments, addComment}){
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      comment: "",
    },

    validate(values) {
      return formikValidation(values)(
        Joi.object({
          comment: Joi.string().min(1).max(1024).required().label("Comment"),
        })
      );
    },

    onSubmit: async ({comment}) => {
    await addComment(comment);
    },
  });
  return (
    <div className="m-3">
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex items-center justify-center bg-white"
        >
          <input
            {...formik.getFieldProps("comment")}
            name="comment"
            id="comment"
            type="text"
            placeholder="Type a comment..."
            className="w-full rounded-l-md p-4 outline-none border-t border-b border-l border-gray-300"
          />

          <button
            type="submit"
            disabled={!formik.isValid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Send
          </button>
        </form>
      </div>

      {comments.map((comm) => {
        return <Comment key={comm.id} post={post} comment={comm} />;
      })}
    </div>
  );
}

export default Comments;