import { NavLink } from "react-router-dom";
import styles from "../styles/SideNavLinks.module.css";

function MobileSideNavLinkItem(props: {
  isCollapse: boolean;
  isMobileCollapse: boolean;
  isHover: boolean;
  link: string;
  icon: any;
  title: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      onClick={props.onClick}
      style={({ isActive }) =>
        isActive
          ? {
              color: "#F3C3F7",
              borderRadius: "1px",
              borderLeft: "3.5px #F3C3F7 solid",
              backgroundColor: "transparent",
            }
          : {}
      }
      className={
        props.isCollapse ||
        (!props.isCollapse && props.isHover) ||
        !props.isMobileCollapse
          ? `${styles.sidenavlinks}  flex flex-row font-light font-family-roboto tracking-wider `
          : `${styles.sidenavlinks}  w-full grid place-content-center font-family-roboto tracking-wide`
      }
      to={props.link}
    >
      <div className="mr-2">{props.icon}</div>
      {(props.isCollapse ||
        (!props.isCollapse && props.isHover) ||
        !props.isMobileCollapse) && <p>{props.title}</p>}
    </NavLink>
  );
}

export default MobileSideNavLinkItem;
