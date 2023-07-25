function Input({ lable, name, error, ...rest }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {lable}
      </label>
  
      {error && <span className="text-red-500">*</span>}
      <input
        {...rest}
        name={name}
        placeholder={lable}
        id={name}
        // className={["p-1", error && "is-invalid"].join(" ")}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-xs italic">{error}</span>
    </div>
  );
}

export default Input;
