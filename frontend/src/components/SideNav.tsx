import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";
const SideNav = (props: {
  mobileSideBarClassName: string;

  className: string;
  isCollapse: boolean;
  isMobileCollapse: boolean;
  isHover: boolean;
  onMobileCollapse: () => void;
  onCollapse: () => void;
  onHover: () => void;
}) => {
  return (
    <div
      className={`bg-black ${
        !props.isMobileCollapse
          ? "!xs:w-16 absolute lg:relative"
          : "xs:w-60 absolute lg:relative"
      } lg:w-max xs:h-min lg:h-max z-40`}
    >
      <DesktopSideBar
        isHover={props.isHover}
        onMouseEnter={props.onHover}
        onMouseLeave={props.onHover}
        className={props.className}
        onCollapse={props.onCollapse}
        isCollapse={props.isCollapse}
      />
      <MobileSideBar
        className={props.mobileSideBarClassName}
        onCollapse={props.onMobileCollapse}
        isCollapse={props.isMobileCollapse}
      />
    </div>
  );
};

export default SideNav;
