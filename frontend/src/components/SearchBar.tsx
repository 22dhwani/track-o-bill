import { useEffect, useState } from "react";
import Search from "../../images/Search.svg";
import { useLocation } from "react-router-dom";

const SearchBar = (props: {
  onChange: (key: string) => void;
  className?: string;
  formclassName?: string;
}) => {
  const [searchKey, setSearchKey] = useState("");

  const searchHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    props.onChange(searchKey);
  };
  const location = useLocation();

  //empties the bar on other page load
  useEffect(() => {
    setSearchKey("");
  }, [location.pathname]);
  const searchBarClass =
    "flex items-center  text-sm  font-family-roboto text-white w-full py-2 px-2 bg-black  rounded-md   box-border  h-max  ease-in focus:caret-slate-500   " +
    props.className;
  return (
    <form className={"lg:w-3/6 xs:w-10/12 md:w-4/6 " + props.formclassName}>
      <div className={searchBarClass}>
        <button onClick={searchHandler} className="mr-3">
          <img src={Search} className="w-5 h-5" />
        </button>
        <input
          value={searchKey}
          placeholder="Search here.."
          className="focus:outline-none w-full placeholder:text-sm placeholder:text-white placeholder:font-normal placeholder:tracking-wider  bg-black"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKey(event.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
