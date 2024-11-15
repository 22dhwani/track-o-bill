import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  > {
  fullWidth?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  color?: "primary" | "secondary" | "success" | "ghost" | "error" | "gray";
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  buttonClassName?: string;
  centerclassname?: string;
  size?: "normal" | "small" | "big";
  icon?: any;
  // type?: "submit" | "reset" | "button" | undefined;
}
const Button: FC<ButtonProps> = ({
  children,
  variant = "filled",
  color = "primary",
  size = "normal",
  // type,
  fullWidth = false,
  loading = false,
  rounded = false,
  buttonClassName: buttonClassName,
  disabled = false,
  icon = undefined,
  ...props
}) => {
  let className = `relative block outline-none transition-all border  font--family-roboto duration-75  ring-offset-2 whitespace-nowrap rounded-[8px] focus-visible:ring-2 focus-visible:ring-black ${
    loading ? "disabled:text-transparent" : "disabled:text-slate-500"
  } disabled:bg-gray-200  disabled:border-gray-300  `;
  if (size === "big") className += "px-5 p-2 lg:px-6 lg:p-3 ";
  if (size === "normal") className += "px-[0.8rem] py-[0.5rem]";
  if (size === "small") className += "px-3 p-1.5 text-sm ";
  if (variant === "filled")
    className +=
      "  disabled:bg-gray-300 disabled:text-gray-500 active:shadow-inner text-textColor ";
  if (variant === "filled" && color === "primary")
    className +=
      "bg-[#F3C3F7] text-white hover:bg-primaryBlue/80 hover:text-white";
  if (variant === "filled" && color === "secondary")
    className +=
      "bg-blue-100 hover:bg-blue-200/90 active:bg-blue-200/90 !text-[#F3C3F7] ";

  if (variant === "outlined")
    className +=
      "border-textColor/60  text-textColor hover:bg-gray-100/70 active:bg-gray-100/7-   ";

  if (variant === "ghost" && color === "primary")
    className +=
      "bg-transparent text-primaryBlue  hover:bg-gray-100/70 active:bg-gray-100/7- ";
  if (variant === "ghost" && color === "error")
    className +=
      "bg-[#ff3366] text-dimWhite  hover:bg-[#ff3366]/80  active:bg-[#ff3366]/80  ";

  if (variant === "ghost" && color === "ghost")
    className +=
      "bg-transparent text-gray-500 hover:bg-primary/10  hover:text-primary active:text-primary active:bg-primary/20 ";

  if (variant === "ghost" && color === "gray")
    className +=
      " bg-[#616c81] text-white hover:bg-gray-500/90  active:text-textColor active:bg-gray-500/90 ";

  if (fullWidth) className += "w-full ";
  if (loading) className += "!text-transparent";
  if (rounded) className += "!rounded-full ";

  const loaderClassName =
    "w-full h-full flex justify-center items-center text-lg absolute top-0 left-0 z-[100] disabled:text-slate-500";

  return (
    <button
      className={className + " " + buttonClassName}
      {...props}
      disabled={disabled || loading}
    >
      {loading && (
        <div className={loaderClassName}>
          <svg
            className="w-5 h-5 animate-spin text-slate-700"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          {/* <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> */}
        </div>
      )}
      {!icon ? (
        <div className={`flex  ${props.centerclassname}`}>{children}</div>
      ) : (
        <div className={`flex  ${props.centerclassname}`}>
          {icon}
          {children}{" "}
        </div>
      )}
    </button>
  );
};

export default Button;
