import Button from "./Button";
import Heading from "./Heading";
import MobileSideNavlinks from "./MobileSideNavlinks";
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
          ? ` ${sidebarclass} bg-white  text-textColor`
          : `${sidebarclass} bg-clip-text text-transparent bg-gradient-to-r from-blue-700  via-[#F3C3F7] to-white`
      }   ${props.className}`}
    >
      <div className="flex flex-row items-center  xs:h-[8.676316353887399vh]  gap-1 px-2  border-b-[0.3px] border-b-slate-200 border-r-[0.3px] border-r-slate-200">
        {!props.isCollapse && (
          <div className="flex flex-row mt-2">
            <Heading
              text="YOR"
              variant="subHeader"
              headingclassname={headingclassname}
            />
            <Heading
              text="Jo"
              variant="subHeader"
              headingclassname={`md:text-2xl xs:text-2xl tracking-wide    text-primaryBlue ml-[0.125rem] font-roboto-light`}
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
    </div>
  );
};

export default MobileSideBar;
