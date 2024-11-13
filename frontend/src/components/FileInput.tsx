import "../../styles/Input.css";

const FileInput = ({ ...props }) => {
  const inputClassName = `flex  items-center w-full   text-md   font-sans placeholder:font-sans text-textColor  my-1    focus:ring-0 focus:border focus:border-sky-100  md:mx-0   border rounded-lg      ${props.className}`;
  return (
    <div className={inputClassName}>
      {props.icon && <img src={props.icon} className="mr-3" />}
      <input
        type="file"
        {...props}
        className={`!h-full focus:outline-none tracking-wide  w-full  ease-in   placeholder:text-mediumGray placeholder:text-sm  file:py-3  file:px-2 file:text-slate-400 file:font-family-roboto file:text-sm file:bg-transparent file:border-0
         file:mr-4
        ${
          props.disabled
            ? "cursor-not-allowed bg-transparent"
            : "cursor-pointer bg-transparent"
        }`}
      />
    </div>
  );
};

export default FileInput;
