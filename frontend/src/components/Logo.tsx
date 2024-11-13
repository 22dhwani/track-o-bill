import "../../styles/Logo.css";
import reactLogo from "../../assets/react.svg";

const Logo = () => {
  return (
    <div className="mb-5 mx-auto">
      <img src={reactLogo} className="logo w-12 h-12 react" alt="React logo" />
    </div>
  );
};

export default Logo;
