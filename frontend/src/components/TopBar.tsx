import UserImage from "../../images/UserImage.png";

import SearchBar from "./SearchBar";
import Heading from "./Heading";

//topbar
const Topbar = (props: { isCollapse: boolean }) => {
  const topbarClass = `xs:fixed right-0 overflow-y-hidden border-b-[0.3px] border-b-[#1A1B1C] 3xl:h-[8.604316353887399vh] 2xl:h-[8.354316353887399vh] xl:h-[8.754316353887399vh] lg:h-[9.754316353887399vh] xs:h-[8.754316353887399vh] z-20  w-screen  flex lg:py-5 py-4  xs:px-4  items-center mb-10 sm:pl-24 xs:pl-20 !overflow-x-hidden  bg-[#1A1B1C] `;
  return (
    <div className="relative ">
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
        <div className=" flex items-center ml-auto gap-2  cursor-pointer">
          <img src={UserImage} className="object-contain md:w-10 xs:w-10" />
          <div className="flex flex-col xs:hidden md:inline gap-2 w-full ">
            <Heading
              variant="subHeader"
              text="Bill Gates"
              headingclassname="text-white text-base  w-full font-roboto-bold"
            />
            <Heading
              variant="smallTitle"
              text="Canada"
              headingclassname="text-white font-normal font-roboto-light  text-[#6571ff] !text-xs tracking-wide"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
