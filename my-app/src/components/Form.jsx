"use client";
import Input from "./Input";

function Form({ inputs = [], formik, buttonTitle }) {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  w-full "
      noValidate
      onSubmit={formik.handleSubmit}
    >
      {inputs.map((input) => {
        return (
          <Input
            key={input.name}
            {...formik.getFieldProps(input.name)}
            error={formik.touched[input.name] && formik.errors[input.name]}
            lable={input.lable}
            type={input.type}
          ></Input>
        );
      })}

      <div className="p-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!formik.isValid}
        >
          {buttonTitle}
        </button>
      </div>
    </form>
  );
}

export default Form;
