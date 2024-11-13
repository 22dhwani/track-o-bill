import Button from "./Button";
import Heading from "./Heading";
import MobileSideNavlinks from "./MobileSideNavlinks";
import Dollar from "../../images/dollar.svg";
import Gif from "../../images/save.gif";

const MobileSideBar = (props: {
  isCollapse: boolean;
  className: string;
  onCollapse: () => void;
}) => {
  const buttonClassName =
    "bg-clip-text text-transparent border-transparent text-lg font-bold ";
  const headingclassname = `font-semibold text-textColor text-2xl font-sans md:text-xl xs:text-2xl xs:pl-2 lg:w-max md:w-max  sm:inline tracking-wide lg:hidden`;
  const sidebarclass = `h-min  xs:visible lg:hidden   overflow-y-hidden h-screen !oveflow-x-hidden absolute lg:relative grid placeholder-content-center`;
  return (
    <div
      className={` ${
        !props.isCollapse
          ? ` ${sidebarclass} bg-slate-900  text-textColor`
          : `${sidebarclass} bg-clip-text text-transparent bg-gradient-to-r from-blue-700  via-[#F3C3F7] to-white`
      }   ${props.className}`}
    >
      <div className="flex flex-row items-center  xs:h-[8.676316353887399vh]  gap-1 px-2  border-b-[0.3px] border-none border-r-[0.3px] border-r-slate-200">
        {!props.isCollapse && (
          <div className="flex items-center">
            <img src={Dollar} alt="Dollar icon" className="w-6 h-6 mr-2" />
            <Heading
              text="TrackOBill"
              variant="headingTitle"
              headingclassname="text-2xl font-bold text-white"
            />
          </div>
        )}
        <Button
          variant="outlined"
          onClick={props.onCollapse}
          buttonClassName={`${
            props.isCollapse
              ? `${buttonClassName}  hover:bg-textColor `
              : `${buttonClassName} !text-textColor ml-auto`
          }`}
        >
          <div className="space-y-1 mt-1">
            <div className="w-5 h-[0.15rem] bg-mediumGray rounded-md"></div>
            <div className="w-5 h-0.5 bg-mediumGray rounded-md"></div>
            <div className="w-5 h-[0.15rem] bg-mediumGray rounded-md"></div>
          </div>
        </Button>
      </div>
      <MobileSideNavlinks
        isMobileCollapse={props.isCollapse}
        onCollapse={props.onCollapse}
      />
      {!props.isCollapse && (
        <div className="sticky bottom-0">
          <img src={Gif} alt="Save animation" />
        </div>
      )}
    </div>
  );
};

export default MobileSideBar;
