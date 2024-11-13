import { useState } from "react";
import UserImage from "../../images/UserImage.png";
import DownArrow from "../../images/DownArrow.svg";
import TopBarMenu from "./TopBarMenu";
import Button from "./Button";
import SearchBar from "./SearchBar";
import Heading from "./Heading";

//topbar
const Topbar = (props: { isCollapse: boolean }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const topbarClass = `xs:fixed right-0 overflow-y-hidden border-b-[0.3px] border-b-slate-200 3xl:h-[8.604316353887399vh] 2xl:h-[8.354316353887399vh] xl:h-[8.754316353887399vh] lg:h-[9.754316353887399vh] xs:h-[8.754316353887399vh] z-20  w-screen  flex lg:py-5 py-4  xs:px-4  items-center mb-10 sm:pl-24 xs:pl-20 !overflow-x-hidden  bg-white `;
  return (
    <div className="relative ">
      {openMenu && <TopBarMenu onClose={() => setOpenMenu(false)} />}
      <div
        className={` ${topbarClass}
           ${props.isCollapse && "lg:pl-64"}
           `}
      >
        <SearchBar
          onChange={(key) => {
            console.log(key);
          }}
        />
        <div
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          className=" flex items-center ml-auto gap-2  cursor-pointer"
        >
          <img src={UserImage} className="object-contain md:w-10 xs:w-10" />
          <div className="flex flex-col xs:hidden md:inline gap-2 w-full ">
            <Heading
              variant="subHeader"
              text="Yorjo Member"
              headingclassname="text-textColor text-base  w-full font-roboto-bold"
            />
            <Heading
              variant="smallTitle"
              text="India"
              headingclassname="text-textColor font-normal font-roboto-light  text-[#6571ff] !text-xs tracking-wide"
            />
          </div>
          <Button
            variant="outlined"
            buttonClassName="border-none !py-2 !px-2 !text-textColor xs:hidden md:inline  font-semibold rounded-full text-md font-sans"
          >
            <img src={DownArrow} className="w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
