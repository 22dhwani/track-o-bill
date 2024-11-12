import Button from "./Button";
import SideNavLinks from "./DesktopSideNavLinks";
import Heading from "./Heading";
import Dollar from "../../images/dollar.svg";
import Gif from "../../images/save.gif";

const DesktopSideBar = (props: {
  isCollapse: boolean;
  className: string;
  onCollapse: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHover: boolean;
}) => {
  const buttonClassName = `bg-clip-text  text-transparent border-transparent text-lg font-bold bg-textColor  hover:bg-gradient-to-r from-white to-blue-500`;
  const headingclassname = ` text-[#000865]  !font-bold md:text-2xl xs:text-lg lg:pl-4 xs:pl-2 md:w-max xs:hidden sm:inline tracking-wide md:visible xs:collapse font-roboto`;
  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={`${
        props.className
      } lg:flex flex-col text-left bg-slate-900  text-white  lg:h-screen z-40 xs:hidden !overflow-x-hidden ${
        !props.isCollapse && props.isHover ? "!w-60" : "w-[5.187500000000001vw]"
      } ${props.isCollapse ? "!w-60" : "w-inherit"}`}
    >
      <div className="lg:flex flex-row items-center xs:hidden py-3 border-none 3xl:h-[12.334316353887399vh]  2xl:h-[11.934316353887399vh] xl:h-[12.434316353887399vh] lg:h-[12.534316353887399vh] xs:h-[9.434316353887399vh] justify-between px-1.5 libre-bold ">
        {props.isCollapse && (
          <div className="flex ">
            <img src={Dollar} alt="Dollar icon" />
            <Heading
              variant="headingTitle"
              text="TrackOBill"
              headingclassname="text-3xl !font-bold text-white !libre-bold ml-3"
            />
          </div>
        )}

        <Button
          onClick={props.onCollapse}
          variant="outlined"
          buttonClassName={
            !props.isCollapse
              ? `mx-auto ${buttonClassName}`
              : ` ${buttonClassName}`
          }
        >
          <div className="space-y-1">
            <div className="w-5 h-[0.18rem] bg-white rounded-md"></div>
            <div className="w-5 h-0.5 bg-white rounded-md"></div>
            <div className="w-5 h-[0.19rem] bg-white rounded-md"></div>
          </div>
        </Button>
      </div>
      <SideNavLinks isCollapse={props.isCollapse} isHover={props.isHover} />
      <div className="sticky bottom-0">
        <img src={Gif} alt="Save animation" />
      </div>
    </div>
  );
};

export default DesktopSideBar;
