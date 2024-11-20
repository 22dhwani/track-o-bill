import "../styles/Input.css";

const TextArea = ({ ...props }) => {
  const inputClassName = `flex  items-center w-full   text-md   font-poppins  text-textColor  my-1    focus:ring-0 focus:border focus:border-slate-100  md:mx-0   border rounded-lg    dark:bg-black  ${props.className}`;
  return (
    <div className={inputClassName}>
      {props.icon && <img src={props.icon} className="mr-3" />}
      <textarea
        {...props}
        className={` focus:outline-none tracking-wide  text-black placeholder:font-poppins ease-in px-2 dark:text-white placeholder:text-slate-400 placeholder:text-md  py-2.5 ${
          props.type === "checkbox" ? "w-5 h-5" : "!h-full  w-full"
        } ${
          props.disabled
            ? "cursor-not-allowed bg-transparent"
            : "cursor-text bg-transparent"
        }`}
      />
    </div>
  );
};

export default TextArea;
