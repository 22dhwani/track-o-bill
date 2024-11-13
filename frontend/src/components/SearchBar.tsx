import { useEffect, useState } from "react";
import Search from "../../assets/Search.svg";
import { useLocation } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = (props: { onChange: (key: string) => void }) => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearch = useDebounce(searchKey, 700);

  const searchHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    props.onChange(searchKey);
  };
  const location = useLocation();

  useEffect(() => {
    if (debouncedSearch.length > 0) props.onChange(debouncedSearch);
  }, [debouncedSearch]);

  //empties the bar on other page load
  useEffect(() => {
    setSearchKey("");
  }, [location.pathname]);
  const searchBarClass =
    "flex items-center  text-sm  font-family-roboto text-textColor w-full py-2 px-2 bg-white  rounded-md   box-border  h-max  ease-in focus:caret-slate-500   ";
  return (
    <form className="lg:w-3/6 xs:w-10/12 md:w-4/6">
      <div className={searchBarClass}>
        <button onClick={searchHandler} className="mr-3">
          <img src={Search} className="w-5 h-5" />
        </button>
        <input
          value={searchKey}
          placeholder="Search here.."
          className="focus:outline-none w-full placeholder:text-sm placeholder:text-mediumGray placeholder:font-normal placeholder:tracking-wider  bg-white"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKey(event.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
