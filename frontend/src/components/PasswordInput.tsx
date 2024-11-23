import { useState } from "react";
import EyeOff from "../../images/eye-off.svg";
import Eye from "../../images/eye.svg";

const PasswordInput = ({ ...props }) => {
  const [passwordType, setPasswordType] = useState("password");
  const [icon, seticon] = useState(EyeOff);
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(evnt?.target?.value);
  };
  const togglePassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      seticon(Eye);
      return;
    }
    setPasswordType("password");
    seticon(EyeOff);
  };
  const passwordClassName = `flex items-center w-full bg-black  focus:border-2 focus:border-sky-100 text-md w-full  font-family-roboto  text-white px-2 my-1    md:mx-0   border rounded-lg  ${props.className} `;

  return (
    <div className={passwordClassName}>
      {props.icon && <img src={props.icon} className="mr-3" />}
      <input
        type={passwordType}
        value={passwordInput}
        onChange={handlePasswordChange}
        {...props}
        className={`focus:outline-none bg-black font-family-roboto tracking-wide w-full ease-in focus:caret-primaryBlue  placeholder:font-family-roboto   placeholder:text-slate-400 placeholder:text-md  py-2.5 ${props.placeholderclassname}`}
      />
      <button className="ml-auto">
        <img src={icon} onClick={togglePassword} alt="eye" />
      </button>
    </div>
  );
};

export default PasswordInput;
